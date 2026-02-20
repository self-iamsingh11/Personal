'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const WALL_IMAGES = [
    '/images/HeroImages/Abhishek_Singh_A_fully_silhouetted_form_of_Lord_Shiva_seated_in_50385085-cfaf-401d-9130-40dbff6d66ad.png',
    '/images/HeroImages/Abhishek_Singh_An_ultra_realistic_highly_detailed_digital_image_17a55b27-3697-4440-8d15-98e85709b0e8.png',
    '/images/HeroImages/Abhishek_Singh_Create_an_Full_body_portrait_of_the_composite_fo_936ec28b-45b9-429f-8307-8950b342be64.png',
    '/images/HeroImages/Abhishek_Singh_Lord_Hanuman_standing_in_powerful_yet_serene_div_822adb94-874c-4ea0-819e-105af577f052.png',
    '/images/HeroImages/Abhishek_Singh_Lord_Krishna_seated_underwater_playing_flute_ext_209c691d-8bd6-4184-bbc8-1beb247a04cb.png',
    '/images/HeroImages/Abhishek_Singh_OM_in_Sanskrit_font_image_background_in_black_le_d1285f4c-603a-4be8-bb4c-b01c24376378.png',
    '/images/HeroImages/Abhishek_Singh_a_surreal_divine_image_of_Lord_Hanuman_seated_in_62973b59-8a82-4986-b0e4-a25d08fc11c3.png',
    '/images/HeroImages/Abhishek_Singh_at_the_center_a_majestic_Goddess_Durga_stands_re_d8b8e16b-f256-496a-a7bf-904b98eaf264.png',
    '/images/HeroImages/Abhishek_Singh_close-up_portrait_of_Lord_Shiva_glowing_intense__9dbee748-2d80-4be0-9837-21965b0f3f3b.png',
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
