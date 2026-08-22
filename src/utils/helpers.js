import axios from "axios";

export function formatVND(amount) {
  const trim = (n) => n % 1 === 0 ? n.toFixed(0) : n.toFixed(1);
  if (amount >= 1_000_000_000) {
    return trim(amount / 1_000_000_000) + " tỷ";
  }
  if (amount >= 10_000_000) {
    return trim(amount / 1_000_000) + " triệu";
  }
  return Number(amount).toLocaleString("vi-VN") + " đ";
}

export function formatVNDShort(amount) {
  if (amount >= 1_000_000_000) return (amount / 1_000_000_000).toFixed(1) + "B";
  if (amount >= 1_000_000) return (amount / 1_000_000).toFixed(0) + "M";
  if (amount >= 1_000) return (amount / 1_000).toFixed(0) + "K";
  return amount;
};

export function formatDateVN(date) {
  return new Date(date).toLocaleDateString("vi-VN");
}

export function getInitials(name) {
  return name.split(" ").slice(-2).map(w => w[0]).join("").toUpperCase();
};

export function avatarColor(name) {
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-teal-500", "bg-indigo-500", "bg-yellow-500", "bg-gray-500"];
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) % colors.length;
  return colors[hash];
};

export function images(path) {
  const image = Object.fromEntries(Object.entries(import.meta.glob("../assets/img/*", { eager: true, import: "default" })).map(([key, value]) => [key.split("/").pop(), value]));
  return image[path];
};

export async function getDataFromAPI(url, type = "get", body = null) {
  let data = [];
  const fetchUrl = "/api/v1/" + url;
  switch (type) {
    case "get":
      const resGet = await axios.get(fetchUrl);
      if (resGet) data = resGet.data;
    break;
    case "post":
      const resPost = await axios.post(fetchUrl, body);
      if (resPost) data = resPost.data;
    break;
    case "put":
    
    break;
    case "delete":
    
    break;
    default:
      console.error("Invalid request type");
  }
  return data;
};