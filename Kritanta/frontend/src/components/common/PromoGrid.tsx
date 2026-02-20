'use client';

import Image from 'next/image';
import Link from 'next/link';

const PROMOS = [
    { title: 'Custom Poster', subtitle: 'Get Yours ->', image: '/images/hero/wall_7.jpg', link: '/custom-poster' },
    { title: 'Custom Split Poster', subtitle: 'Upload Your Image Here', image: '/images/hero/wall_6.jpg', link: '/split-poster' },
    { title: 'Custom Retro Prints', subtitle: 'Get Yours', image: '/images/hero/wall_8.jpg', link: '/retro-prints' },
    { title: 'Mini Pocket Photo', subtitle: 'Get Yours ->', image: '/images/hero/wall_9.jpg', link: '/mini-pocket' },
];

export default function PromoGrid() {
    return (
        <section className="bg-white py-4 md:py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">
                        Design Your Own
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {PROMOS.map((promo, idx) => (
                        <Link key={idx} href={promo.link} className="relative aspect-square group overflow-hidden bg-gray-100">
                            <Image
                                src={promo.image}
                                alt={promo.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

                            <div className="absolute top-8 left-0 w-full text-center z-10 flex flex-col items-center">
                                {/* Mimicking the handwritten/script font for 'Custom' */}
                                <span className="font-serif italic text-black text-lg md:text-xl transform -rotate-6">Custom</span>
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black leading-none">
                                    {promo.title.replace('Custom ', '')}
                                </h3>
                                <div className="mt-3 bg-black text-white text-[10px] font-bold px-4 py-1.5 uppercase tracking-widest rounded-sm">
                                    {promo.subtitle}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
