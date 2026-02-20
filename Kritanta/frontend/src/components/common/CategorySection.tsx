'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CATEGORIES = [
    { name: 'Custom Wallpaper', image: '/images/HeroImages/Abhishek_Singh_A_fully_silhouetted_form_of_Lord_Shiva_seated_in_50385085-cfaf-401d-9130-40dbff6d66ad.png', slug: 'custom' },
    { name: 'Superhero', image: '/images/HeroImages/Abhishek_Singh_An_ultra_realistic_highly_detailed_digital_image_17a55b27-3697-4440-8d15-98e85709b0e8.png', slug: 'superhero' },
    { name: 'Car Collections', image: '/images/HeroImages/Abhishek_Singh_Create_an_Full_body_portrait_of_the_composite_fo_936ec28b-45b9-429f-8307-8950b342be64.png', slug: 'cars' },
    { name: 'Movie', image: '/images/HeroImages/Abhishek_Singh_Lord_Hanuman_standing_in_powerful_yet_serene_div_822adb94-874c-4ea0-819e-105af577f052.png', slug: 'movies' },
    { name: 'TV-Series', image: '/images/HeroImages/Abhishek_Singh_Lord_Krishna_seated_underwater_playing_flute_ext_209c691d-8bd6-4184-bbc8-1beb247a04cb.png', slug: 'tv-series' },
    { name: 'Music', image: '/images/HeroImages/Abhishek_Singh_OM_in_Sanskrit_font_image_background_in_black_le_d1285f4c-603a-4be8-bb4c-b01c24376378.png', slug: 'music' },
    { name: 'Video Game', image: '/images/HeroImages/Abhishek_Singh_a_surreal_divine_image_of_Lord_Hanuman_seated_in_62973b59-8a82-4986-b0e4-a25d08fc11c3.png', slug: 'games' },
    { name: 'Motivate', image: '/images/HeroImages/Abhishek_Singh_at_the_center_a_majestic_Goddess_Durga_stands_re_d8b8e16b-f256-496a-a7bf-904b98eaf264.png', slug: 'motivate' },
    { name: 'Anime', image: '/images/HeroImages/Abhishek_Singh_close-up_portrait_of_Lord_Shiva_glowing_intense__9dbee748-2d80-4be0-9837-21965b0f3f3b.png', slug: 'anime' },
    { name: 'Sports', image: '/images/HeroImages/Abhishek_Singh_A_fully_silhouetted_form_of_Lord_Shiva_seated_in_50385085-cfaf-401d-9130-40dbff6d66ad.png', slug: 'sports' },
];

export default function CategorySection() {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center mb-10 relative">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black z-10 bg-white px-4">
                        Wallpaper Collections
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
