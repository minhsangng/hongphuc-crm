import { useState, useEffect, useRef } from 'react';
import { PlayCircle, ArrowRight } from 'lucide-react';
import { images } from '../utils/helpers';

import Navbar from '../components/Navbar';

function Hero() {
    return (
        <section className="h-screen w-screen overflow-hidden relative">
            <div className="bg-[#fef2f2] grid grid-cols-2 grid-rows-1 gap-x-4">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-6xl leading-tight font-extrabold">Nơi Ươn Mầm <br /> Tương Lai <br /> Tươi Sáng <br /> Của Con Trẻ </h1>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-9">
                        Trường mầm non <strong className="text-gray-800 font-semibold">Hồng Phúc</strong> — nơi con trẻ được vui chơi, học tập, trải nghiệm và phát triển toàn diện trong môi trường giáo dục an toàn.
                    </p>
                    <div className="flex flex-wrap items-center gap-x-14">
                       <div className="flex items-center gap-x-2 rounded-xl px-4 py-2 bg-red-200 text-white hover:bg-red-400 cursor-pointer">
                            <button type="button" className="">Đăng ký</button>
                            <ArrowRight/>
                       </div> 
                       <div className="flex items-center gap-x-2">
                            <PlayCircle className="cursor-pointer"/>
                            <p>Giới thiệu</p>
                       </div>
                    </div>
                </div>
                <div className="">
                    <img src={images("hero1.png")} alt="" />
                </div>
            </div>
            <div className="absolute bottom-0 left-0">
                <img src={images("hero-line.png")} alt="" />
            </div>
        </section>
    );
}

export default function Index() {
    return (
        <div className="w-screen max-w-screen min-h-screen overflow-x-hidden">
            <Navbar />
            <Hero />
            <section className="w-screen h-screen">
            
            </section>
        </div>
    );
}