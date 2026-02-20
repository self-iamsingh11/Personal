'use client';

import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 }
    }
};

export default function ProductCard({ product }: { product: Product }) {
    return (
        <motion.div
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            variants={cardVariants}
            whileHover={{ y: -5 }}
        >
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {product.originalPrice > product.price && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                    )}
                </div>

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button className="bg-white p-2 rounded-full hover:bg-accent hover:text-white transition-colors">
                        <Eye size={20} />
                    </button>
                    <button className="bg-white p-2 rounded-full hover:bg-accent hover:text-white transition-colors">
                        <ShoppingCart size={20} />
                    </button>
                    <button className="bg-white p-2 rounded-full hover:bg-accent hover:text-white transition-colors">
                        <Heart size={20} />
                    </button>
                </div>
            </div>

            <div className="p-4">
                <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
                <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>

                <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400 text-xs">
                        {'★'.repeat(5)}
                    </div>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">Rs. {product.price}</span>
                    {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">Rs. {product.originalPrice}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
