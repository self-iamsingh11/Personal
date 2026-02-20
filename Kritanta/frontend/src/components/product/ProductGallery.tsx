'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 sticky top-24">
            {/* Thumbnails (Left on Desktop, Bottom on Mobile) */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:h-[calc(100vh-150px)] w-full md:w-[100px] shrink-0">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] shrink-0 border-2 rounded-lg overflow-hidden transition-all ${selectedImage === idx ? 'border-black' : 'border-transparent hover:border-gray-200'
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[calc(100vh-150px)] bg-gray-50 rounded-xl overflow-hidden group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={images[selectedImage]}
                            alt="Main Product Image"
                            fill
                            className="object-contain md:object-cover"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Sale Badge */}
                <div className="absolute bottom-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Sale
                </div>
            </div>
        </div>
    );
}
