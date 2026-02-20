'use client';

import { useState } from 'react';
import { Star, Truck, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/data/mockProducts';
interface ProductInfoProps {
    product: Product;
}



export default function ProductInfo({ product }: ProductInfoProps) {
    const [openAccordion, setOpenAccordion] = useState<string | null>('description');

    const handleDownload = () => {
        // Simple download trigger
        const link = document.createElement('a');
        link.href = product.images[0];
        link.download = `${product.slug}-wallpaper.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewFullSize = () => {
        window.open(product.images[0], '_blank');
    };

    const toggleAccordion = (value: string) => {
        setOpenAccordion(openAccordion === value ? null : value);
    };

    return (
        <div className="flex flex-col gap-6 sticky top-24 self-start">
            {/* Header */}
            <div>
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={14} fill="currentColor" />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">1000+ Reviews</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black mb-2">
                    {product.title}
                </h1>
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold bg-accent/10 px-2 py-0.5 rounded text-accent">
                        Rs. {product.price.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                        Rs. {product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold border border-red-500 text-red-500 px-2 py-0.5 rounded-full">
                        SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
                <button
                    onClick={handleDownload}
                    className="w-full bg-black text-white font-black uppercase tracking-wider rounded-lg h-12 hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    Download
                </button>
                <button
                    onClick={handleViewFullSize}
                    className="w-full bg-accent text-white font-black uppercase tracking-wider rounded-lg h-12 hover:bg-red-600 transition-colors shadow-sm"
                >
                    View Full Size
                </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                    <Truck size={20} className="text-gray-600" />
                    <div>
                        <p className="font-bold text-xs uppercase">Instant Download</p>
                        <p className="text-[10px] text-gray-500">Available immediately</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className="text-gray-600" />
                    <div>
                        <p className="font-bold text-xs uppercase">Secure Checkout</p>
                        <p className="text-[10px] text-gray-500">SSL Encrypted</p>
                    </div>
                </div>
            </div>

            {/* Accordion */}
            <div className="border-t border-gray-200">
                <AccordionItem
                    title="Description"
                    isOpen={openAccordion === 'description'}
                    onClick={() => toggleAccordion('description')}
                >
                    <p className="text-gray-600 leading-relaxed text-sm">
                        {product.description}
                        <br /><br />
                        <strong>Features:</strong><br />
                        - High-Resolution Output<br />
                        - Instant Digital Download<br />
                        - Vibrant, true-to-life colors
                    </p>
                </AccordionItem>
                <AccordionItem
                    title="Shipping & Returns"
                    isOpen={openAccordion === 'shipping'}
                    onClick={() => toggleAccordion('shipping')}
                >
                    <p className="text-gray-600 leading-relaxed text-sm">
                        As this is a digital download product, you will receive access to your files immediately upon purchase or free download request.
                        <br /><br />
                        Returns are generally not accepted for digital items, but please contact support if you experience any issues with your files.
                    </p>
                </AccordionItem>
            </div>
        </div>
    );
}

function AccordionItem({ title, isOpen, onClick, children }: { title: string, isOpen: boolean, onClick: () => void, children: React.ReactNode }) {
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-4 text-left group"
            >
                <span className="font-bold uppercase text-sm tracking-wider">{title}</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
