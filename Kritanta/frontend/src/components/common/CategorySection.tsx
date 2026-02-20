'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CATEGORIES = [
    { name: 'Custom Poster', image: '/images/hero/wall_2.jpg', slug: 'custom' },
    { name: 'Superhero', image: '/images/categories/superhero.jpg', slug: 'superhero' },
    { name: 'Car Collections', image: '/images/categories/cars.jpg', slug: 'cars' },
    { name: 'Movie', image: '/images/categories/movies.jpg', slug: 'movies' },
    { name: 'TV-Series', image: '/images/categories/games.jpg', slug: 'tv-series' },
    { name: 'Music', image: '/images/categories/music.jpg', slug: 'music' },
    { name: 'Video Game', image: '/images/categories/games.jpg', slug: 'games' },
    { name: 'Motivate', image: '/images/categories/gym.jpg', slug: 'motivate' },
    { name: 'Anime', image: '/images/categories/anime.jpg', slug: 'anime' },
    { name: 'Sports', image: '/images/categories/sports.jpg', slug: 'sports' },
];

export default function CategorySection() {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center mb-10 relative">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black z-10 bg-white px-4">
                        Collections
                    </h2>
                    <div className="absolute w-full h-[2px] bg-cyan-400 top-1/2 -z-0"></div>
                    {/* Note: Posterized has a specific 'COLLECTIONS' header with a teal accent line/shape */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[10px] bg-teal-400/20 -rotate-2 z-0"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-10">
                    {CATEGORIES.map((cat, idx) => (
                        <Link key={idx} href={`/collections/${cat.slug}`} className="group flex flex-col items-center gap-4 w-[100px] md:w-[130px]">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full overflow-hidden shadow-sm border-2 border-transparent group-hover:border-black transition-all"
                            >
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <span className="text-xs md:text-sm font-bold uppercase text-center leading-tight group-hover:text-accent transition-colors">
                                {cat.name}
                            </span>
                        </Link>
                    ))}

                    {/* Explore More Button Circle */}
                    <Link href="/collections" className="group flex flex-col items-center gap-4 w-[100px] md:w-[130px]">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm border-2 border-transparent group-hover:border-black transition-all"
                        >
                            <span className="font-black text-xs md:text-sm text-center px-2">EXPLORE MORE &gt;&gt;</span>
                        </motion.div>
                        <span className="text-xs md:text-sm font-bold uppercase text-center leading-tight">
                            Explore More!
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
