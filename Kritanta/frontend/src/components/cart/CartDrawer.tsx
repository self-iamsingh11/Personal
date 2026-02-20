'use client';

import { X, Minus, Plus, Trash2, Lock, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
    const { items, isOpen, toggleCart, updateQuantity, removeItem } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const freeShippingThreshold = 999;
    const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-black uppercase tracking-tighter">Shopping Cart ({items.length})</h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Free Shipping Bar */}
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                            {subtotal >= freeShippingThreshold ? (
                                <p className="text-sm font-bold text-green-600 text-center mb-2">🎉 You've unlocked FREE Shipping!</p>
                            ) : (
                                <p className="text-sm text-gray-600 text-center mb-2">
                                    Add <span className="font-bold text-black">Rs. {(freeShippingThreshold - subtotal).toFixed(2)}</span> for <span className="font-bold">FREE Shipping</span>
                                </p>
                            )}
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    style={{ width: `${progress}%` }}
                                    className={`h-full rounded-full transition-all duration-500 ${subtotal >= freeShippingThreshold ? 'bg-green-500' : 'bg-black'}`}
                                />
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                        <ShoppingBag className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="font-bold text-lg">Your cart is empty</p>
                                    <button
                                        onClick={toggleCart}
                                        className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase text-sm tracking-wider"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-24 h-32 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start gap-2">
                                                    <h3 className="font-bold text-sm leading-tight text-gray-900 line-clamp-2 uppercase">
                                                        {item.title}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                                                    {item.size} / {item.frame}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border border-gray-200 rounded-md h-8 bg-white">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                        className="w-8 h-full hover:bg-gray-50 flex items-center justify-center text-gray-500"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-full hover:bg-gray-50 flex items-center justify-center text-gray-500"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-sm">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                                <div className="flex justify-between items-center text-lg font-black uppercase">
                                    <span>Subtotal</span>
                                    <span>Rs. {subtotal.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-gray-500 text-center">Taxes and shipping calculated at checkout</p>
                                <button className="w-full bg-accent text-white py-4 rounded-xl font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0">
                                    <Lock size={16} /> Secure Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
