'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
    'All Posters',
    'Motivation',
    'Music',
    'Movies',
    'Anime',
    'Sports',
    'Games',
    'Minimalist'
];

const PRICES = [
    'Under Rs. 499',
    'Rs. 500 - Rs. 999',
    'Rs. 1000 - Rs. 1999',
    'Above Rs. 2000'
];

export default function FilterSidebar() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({
        category: true,
        price: true
    });

    const toggle = (section: string) => {
        setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <aside className="w-full md:w-64 shrink-0 space-y-6">
            {/* Categories */}
            <div className="border-b border-gray-200 pb-6">
                <button
                    onClick={() => toggle('category')}
                    className="flex items-center justify-between w-full font-bold uppercase text-sm tracking-wider mb-4"
                >
                    Category
                    {expanded.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <AnimatePresence>
                    {expanded.category && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <ul className="space-y-3">
                                {CATEGORIES.map(cat => (
                                    <li key={cat}>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center group-hover:border-black transition-colors">
                                                {/* Checkbox state logic would go here */}
                                            </div>
                                            <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{cat}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Price */}
            <div className="border-b border-gray-200 pb-6">
                <button
                    onClick={() => toggle('price')}
                    className="flex items-center justify-between w-full font-bold uppercase text-sm tracking-wider mb-4"
                >
                    Price
                    {expanded.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <AnimatePresence>
                    {expanded.price && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <ul className="space-y-3">
                                {PRICES.map(price => (
                                    <li key={price}>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center group-hover:border-black transition-colors"></div>
                                            <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{price}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </aside>
    );
}
