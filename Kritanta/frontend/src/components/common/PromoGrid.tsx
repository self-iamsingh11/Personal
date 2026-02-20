'use client';

import Image from 'next/image';
import Link from 'next/link';

const PROMOS = [
    { title: 'The Ramayana Epic', subtitle: 'Read the Tale ->', image: '/images/story_thumbnail/Abhishek_Singh_the_book_of_ramayana_--v_7_350d7189-fd08-493d-8a3e-6a6d67d7dcd3.png', link: '#' },
    { title: 'The Mahabharata War', subtitle: 'Explore the Legacy', image: '/images/story_thumbnail/Abhishek_Singh_mahabharata_kingdom_--v_7_a5f5e5f7-2bba-46d4-8104-f99ac6f5e402.png', link: '#' },
    { title: 'Ancient Scriptures', subtitle: 'Uncover Wisdom', image: '/images/story_thumbnail/Abhishek_Singh_stacked_old_hinduism_books_--v_7_97b5cc3d-0a3a-48e9-8c31-d61998605dab.png', link: '#' },
    { title: 'Divine Manuscripts', subtitle: 'Learn More ->', image: '/images/story_thumbnail/Abhishek_Singh_the_book_of_ramayana_--v_7_6fadaac5-6238-4930-a0fd-f6baae575ff7.png', link: '#' },
];

export default function PromoGrid() {
    return (
        <section className="bg-white py-4 md:py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">
                        Stories from Hinduism
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
                                {/* Mimicking the handwritten/script font for 'Epic' */}
                                <span className="font-serif italic text-black text-lg md:text-xl transform -rotate-6">Epic</span>
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black leading-none text-center">
                                    {promo.title}
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
