import { useState, useEffect, useRef } from 'react';
import { PlayCircle, ArrowRight } from 'lucide-react';
import { images } from '../utils/helpers';

import Navbar from '../components/Navbar';

function HeroSection() {
    return (
        <section className="h-screen w-screen overflow-hidden relative">
            <div className="bg-[#fef2f2] grid grid-cols-2 grid-rows-1 gap-x-4">
                <div className="flex flex-col justify-center pl-24">
                    <h1 className="text-6xl text-secondary leading-tight font-extrabold">Nơi Ươn Mầm <br /> Tương Lai <br /> Tươi Sáng <br /> Của Con Trẻ </h1>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4">
                        Trường mầm non <strong className="text-gray-800 font-semibold">Hồng Phúc</strong> — nơi con trẻ được vui chơi, học tập, trải nghiệm và phát triển toàn diện trong môi trường giáo dục an toàn.
                    </p>
                    <div className="flex flex-wrap items-center gap-x-14 z-10">
                       <div className="flex items-center gap-x-2 rounded-xl px-4 py-2 bg-[--color-primary] border border-[--color-border] text-white hover:bg-[--color-button] cursor-pointer">
                            <button type="button" className="font-bold">Đăng ký</button>
                            <ArrowRight/>
                       </div> 
                       <div className="flex items-center gap-x-2">
                            <div className="cursor-pointer relative before:content-[''] before:cursor-pointer before:w-full before:h-full before:scale-125 before:rounded-full before:bg-blue-200 before:absolute before:left-1/2 before:top-1/2 before:!-translate-x-1/2 before:!-translate-y-1/2 before:animate-ping before:duration-300 before:transition-all before:ease-linear after:content-[''] after:cusor-pointer after:w-full after:h-full after:scale-150 after:rounded-full after:bg-blue-100/75 after:absolute after:left-1/2 after:top-1/2 after:!-translate-x-1/2 after:!-translate-y-1/2 after:animate-ping after:delay-700 after:duration-1000 after:transition-all after:ease-linear">
                                <PlayCircle size={40} className="bg-blue-500 rounded-full text-white"/>
                            </div>
                            <p>Giới thiệu</p>
                       </div>
                    </div>
                </div>
                <div className="">
                    <img src={images("hero1.png")} alt="Hero img" />
                </div>
            </div>
            <div className="absolute bottom-0 left-0">
                <img src={images("hero-line.png")} alt="Hero line" />
            </div>
        </section>
    );
}

export default function Index() {
    return (
        <div className="w-screen max-w-screen min-h-screen overflow-x-hidden">
            <Navbar />
            <HeroSection />
            
        </div>
    );
}