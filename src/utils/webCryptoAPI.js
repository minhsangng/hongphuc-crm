export async function generateKey() {
    return await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]
    );
}

export async function encryptData(data, key) {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(JSON.stringify(data));
    
    // IV - Initialization Vector
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const cipherBuffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv }, key, encoded
    );
    
    return { cipherText: arrayBufferToBase64(cipherBuffer), iv: arrayBufferToBase64(iv) };
}

export async function decryptData(cipherText, iv, key) {
    const cipherBuffer = base64ToArrayBuffer(cipherText);
    const ivBuffer = base64ToArrayBuffer(iv);
    
    const decryptedBuffer = await crypto.subtle.decrypt({ name: "AES-GCM", iv: ivBuffer }, key, cipherBuffer);
    
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decryptedBuffer));
}

function arrayBufferToBase64(buffer){
    const bytes = new Uint8Array(buffer);
    let binary = "";
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary);
}

function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i=0; i<binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}