'use client';

import { useState } from 'react';
import { Star, Truck, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/data/mockProducts';
import { useCartStore } from '@/store/useCartStore';

interface ProductInfoProps {
    product: Product;
}

const SIZES = ['A4 (21 x 30 cm)', 'A3 (30 x 42 cm)'];
const FRAMES = [
    { name: 'No Frame', color: 'bg-gray-200' },
    { name: 'Black Frame', color: 'bg-black' },
    { name: 'White Frame', color: 'bg-white border' },
];

export default function ProductInfo({ product }: ProductInfoProps) {
    const [selectedSize, setSelectedSize] = useState(SIZES[0]);
    const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
    const [quantity, setQuantity] = useState(1);
    const [openAccordion, setOpenAccordion] = useState<string | null>('description');

    const { addItem } = useCartStore();

    const toggleAccordion = (value: string) => {
        setOpenAccordion(openAccordion === value ? null : value);
    };

    const handleAddToCart = () => {
        addItem({
            productId: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            size: selectedSize,
            frame: selectedFrame.name,
            quantity: quantity
        });
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

            {/* Selectors */}
            <div className="space-y-4 border-t border-b py-6 border-gray-100">
                {/* Size */}
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 block">Size</span>
                    <div className="flex flex-wrap gap-3">
                        {SIZES.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${selectedSize === size
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-black'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Frame */}
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 block">
                        Frame: <span className="text-gray-500 font-normal ml-1">{selectedFrame.name}</span>
                    </span>
                    <div className="flex gap-3">
                        {FRAMES.map((frame) => (
                            <button
                                key={frame.name}
                                onClick={() => setSelectedFrame(frame)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${selectedFrame.name === frame.name
                                        ? 'border-accent'
                                        : 'border-transparent hover:border-gray-200'
                                    }`}
                                aria-label={frame.name}
                            >
                                <div className={`w-8 h-8 rounded-full ${frame.color} shadow-sm border border-black/10`} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
                <div className="flex gap-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-300 rounded-lg h-12 w-32 shrink-0">
                        <button
                            className="w-10 h-full flex items-center justify-center hover:bg-gray-50 text-xl"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >−</button>
                        <span className="flex-1 text-center font-bold text-lg">{quantity}</span>
                        <button
                            className="w-10 h-full flex items-center justify-center hover:bg-gray-50 text-xl"
                            onClick={() => setQuantity(quantity + 1)}
                        >+</button>
                    </div>

                    {/* Add to Cart */}
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-black text-white font-black uppercase tracking-wider rounded-lg h-12 hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Add to Cart
                    </button>
                </div>
                <button className="w-full bg-accent text-white font-black uppercase tracking-wider rounded-lg h-12 hover:bg-red-600 transition-colors shadow-sm">
                    Buy It Now
                </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                    <Truck size={20} className="text-gray-600" />
                    <div>
                        <p className="font-bold text-xs uppercase">Free Shipping</p>
                        <p className="text-[10px] text-gray-500">On all prepaid orders</p>
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
                        - High-Quality 300GSM Art Paper<br />
                        - Matte Finish ensuring no glare<br />
                        - Vivid, fade-resistant colors
                    </p>
                </AccordionItem>
                <AccordionItem
                    title="Shipping & Returns"
                    isOpen={openAccordion === 'shipping'}
                    onClick={() => toggleAccordion('shipping')}
                >
                    <p className="text-gray-600 leading-relaxed text-sm">
                        We offer free shipping on all prepaid orders across India. Orders are typically processed within 24-48 hours and delivered within 4-7 business days.
                        <br /><br />
                        Returns are accepted within 7 days of delivery for damaged or incorrect items.
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
