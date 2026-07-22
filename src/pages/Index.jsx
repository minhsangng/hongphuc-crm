import { useState, useEffect, useRef } from 'react';
import { PlayCircle, ArrowRight } from 'lucide-react';
import { images } from '../utils/helpers';

import Navbar from '../components/Navbar';

function HeroSection() {
    return (
        <section className="h-screen w-screen relative">
            <div className="bg-[#fef2f2] grid grid-cols-2 grid-rows-1 gap-4 px-4 relative">
                <div className="flex flex-col justify-center lg:gap-4 pl-24 z-10">
                    <h1 className="text-6xl lg:text-5xl text-secondary leading-tight font-extrabold">Nơi Ươn Mầm <br /> Tương Lai Tươi Sáng <br /> Của Con Trẻ </h1>
                    <p className="text-gray-500 text-lg leading-10 lg:leading-6 max-w-lg mx-auto lg:mx-0 mb-4">
                        Trường mầm non <strong className="text-gray-800 font-semibold">Hồng Phúc</strong> — nơi con trẻ được vui chơi, học tập, trải nghiệm và phát triển toàn diện trong môi trường giáo dục an toàn.
                    </p>
                    <div className="flex flex-wrap items-center gap-x-14 z-10">
                       <div className="flex items-center gap-x-2 rounded-xl px-8 py-3 bg-[--color-primary] border border-[--color-border] text-white hover:bg-[--color-button] cursor-pointer">
                            <button type="button" className="font-bold">Ghi danh trẻ</button>
                            <ArrowRight/>
                       </div> 
                       <div className="flex items-center gap-x-2">
                            <div className="cursor-pointer relative before:content-[''] before:cursor-pointer before:w-[130%] before:h-[130%] before:rounded-full before:bg-blue-200 before:absolute before:left-1/2 before:top-1/2 before:!-translate-x-1/2 before:!-translate-y-1/2 before:animate-ping before:duration-[1s] before:transition-all before:ease-linear after:content-[''] after:cusor-pointer after:w-[200%] after:h-[200%] after:rounded-full after:bg-blue-100/75 after:absolute after:left-1/2 after:top-1/2 after:!-translate-x-1/2 after:!-translate-y-1/2 after:animate-ping after:duration-[5s] after:transition-all after:ease-linear">
                                <PlayCircle size={52} className="bg-blue-500 rounded-full text-white"/>
                            </div>
                            <p>Giới thiệu</p>
                       </div>
                    </div>
                </div>
                <div>
                    <img src={images("hero1.png")} alt="Hero img" />
                </div>
                <div className="absolute top-32 left-1/3">
                    <img className="animate-bounce transition-all ease-in-out" src={images("car.png")} alt="Car" />
                </div>
                <div className="absolute top-14 left-2/3">
                    <img className="animate-pulse" src={images("crown.png")} alt="Crown" />
                </div>
                <div className="absolute bottom-24 left-2 z-0">
                    <img className="w-44" src={images("perashute.png")} alt="Perashute" />
                </div>
            </div>
            <div className="absolute bottom-0 left-0">
                <img src={images("hero-line.png")} alt="Hero line" />
            </div>
        </section>
    );
}

function AboutSection() {
    return (
        <section className="w-screen relative">
            <div className="grid grid-cols-2 grid-rows-1 gap-10 px-4 pt-20 bg-white">
                <div className="relative">
                    <div className="bg-bottom bg-contain bg-no-repeat" style={{ backgroundImage: `url('${images("about-bg-1.png")}')` }}>
                        <img src={images("about-1.png")} alt="About" className="translate-x-32" />
                        <div className="absolute top-1/2 left-2/3">
                            <img src={images("ab-counter.png")} alt="" />
                            <div className="absolute top-1/3 left-0 w-full text-center text-white">
                                <b className="text-6xl lg:text-5xl">10+</b> <br />
                                <b className="text-2xl lg:text-xl">Kinh nghiệm</b>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="px-6 py-3 rounded-3xl bg-red-400 text-white font-bold w-fit">Về chúng tôi</div>   
                </div>
            </div>
        </section>
    );
}

export default function Index() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <AboutSection />
        </div>
    );
}