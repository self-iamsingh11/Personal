'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const WALL_IMAGES = [
    '/images/hero/wall_0.jpg',
    '/images/hero/wall_1.jpg',
    '/images/hero/wall_2.jpg',
    '/images/hero/wall_3.jpg',
    '/images/hero/wall_4.jpg',
    '/images/hero/wall_5.jpg',
    '/images/hero/wall_6.jpg',
    '/images/hero/wall_7.jpg',
    '/images/hero/wall_8.jpg',
    '/images/hero/wall_9.jpg',
    '/images/hero/wall_10.jpg',
    '/images/hero/wall_11.jpg',
];

export default function HeroSection() {
    return (
        <section className="bg-white py-8 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">
                    Transformed Over <span className="text-stroke">2,50,000+</span> Walls.
                </h1>
            </div>

            {/* Scrolling Marquee */}
            <div className="relative flex w-full overflow-hidden">
                <motion.div
                    className="flex gap-4 whitespace-nowrap"
                    animate={{ x: [0, -2000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                    }}
                >
                    {[...WALL_IMAGES, ...WALL_IMAGES, ...WALL_IMAGES].map((src, idx) => (
                        <div key={idx} className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] flex-shrink-0 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <Image
                                src={src}
                                alt="Wait Art Transformation"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
