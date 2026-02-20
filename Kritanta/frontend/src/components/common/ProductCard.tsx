'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
    id: string;
    image: string;
    title: string;
    price: number;
    originalPrice?: number;
    slug: string;
}

export default function ProductCard({ image, title, price, originalPrice, slug }: Omit<ProductCardProps, 'id'>) {
    return (
        <Link href={`/product/${slug}`} className="group block h-full">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm mb-3">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Sale Badge - Bottom Left, Black pill shape */}
                <div className="absolute bottom-3 left-3 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Sale
                </div>
            </div>

            <div className="flex flex-col gap-1 text-center">
                <h3 className="text-[13px] leading-tight font-medium text-gray-900 line-clamp-2 min-h-[40px] uppercase tracking-wide">
                    {title}
                </h3>
                <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="font-bold">From Rs. {price.toFixed(2)}</span>
                    {originalPrice && (
                        <span className="text-gray-400 line-through text-xs">Rs. {originalPrice.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
