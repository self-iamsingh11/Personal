'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const REVIEWS = [
    '/images/reviews/review_0.webp',
    '/images/reviews/review_1.webp',
    '/images/reviews/review_2.webp',
    '/images/reviews/review_3.webp',
    '/images/reviews/review_4.webp',
    '/images/reviews/review_5.webp',
    '/images/reviews/review_6.webp',
    '/images/reviews/review_7.webp',
    '/images/reviews/review_8.webp',
    '/images/reviews/review_9.webp',
    '/images/reviews/review_10.webp',
    '/images/reviews/review_11.webp',
    '/images/reviews/review_12.webp',
    '/images/reviews/review_13.webp',
    '/images/reviews/review_14.webp',
];

export default function ReviewsCarousel() {
    const [width, setWidth] = useState(0);
    const carousel = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (carousel.current) {
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
        }
    }, []);

    return (
        <section className="bg-white py-12 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">
                        Welcome to the quiz zone
                    </h2>
                    <div className="flex justify-center mt-2 gap-1 text-yellow-400">
                        {'★★★★★'.split('').map((star, i) => (
                            <span key={i} className="text-2xl">{star}</span>
                        ))}
                    </div>
                    <p className="text-sm font-medium mt-2 text-gray-500">4.9/5 Rating based on 5000+ Reviews</p>
                </div>

                <motion.div ref={carousel} className="cursor-grab overflow-hidden">
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        className="flex gap-4"
                    >
                        {REVIEWS.map((src, idx) => (
                            <motion.div
                                key={idx}
                                className="min-w-[200px] md:min-w-[250px] aspect-[9/16] relative rounded-xl overflow-hidden shadow-sm"
                            >
                                <Image
                                    src={src}
                                    alt="Customer Review"
                                    fill
                                    className="object-cover pointer-events-none"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
