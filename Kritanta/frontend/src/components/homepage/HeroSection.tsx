'use client';

import { motion } from 'framer-motion';

const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" as const }
    }
};

const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.2, duration: 0.7 }
    }
};

export default function HeroSection() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
            {/* Background Image Placeholder */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0 opacity-50"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://placehold.co/1920x1080/1f2937/ffffff?text=Kritanta+Hero')] bg-cover bg-center z-0 opacity-40"></div>

            <div className="relative z-10 text-center text-white px-4">
                <motion.h1
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                >
                    India's No. 1 <br /> <span className="text-accent underline decoration-accent/30">Custom Wall Poster</span> Store
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto"
                    variants={heroVariants}
                    initial="hidden"
                    animate="visible"
                >
                    Premium quality posters delivered to your doorstep. Transform your walls with Kritanta.
                </motion.p>

                <motion.div
                    className="flex gap-4 justify-center flex-wrap"
                    variants={heroVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <button className="px-8 py-3 text-lg rounded-md font-bold transition-all duration-200 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95">Shop Now</button>
                    <button className="px-8 py-3 text-lg rounded-md font-bold transition-all duration-200 cursor-pointer bg-transparent text-white border-2 border-white hover:bg-white hover:text-black hover:shadow-lg active:scale-95">Customize</button>
                </motion.div>
            </div>
        </section>
    );
}
