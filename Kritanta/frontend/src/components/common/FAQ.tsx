'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
    { q: "Is it possible to order wallpapers in bulk for my business or event?", a: "Yes! We cater to bulk orders, especially for businesses. Simply drop us a message on WhatsApp for special rates and assistance." },
    { q: "How can I order my own design as a wallpaper?", a: "Go to our 'Custom Wallpaper' section, upload your high-quality image, select the format, and download your custom piece!" },
    { q: "How many days does it take for delivery?", a: "Delivery is instant! Since these are digital wallpapers, you'll be able to download your items immediately after purchase." },
    { q: "How can I access my downloaded wallpapers?", a: "You can download your purchased items immediately from the success page or access them anytime from your 'My Account' section." },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black flex items-center justify-center gap-2">
                        FAQ <span className="text-accent">?</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-4">
                    {FAQS.map((faq, idx) => (
                        <div key={idx} className="border-b border-gray-100 pb-4">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex justify-between items-center text-left py-2 hover:text-accent transition-colors"
                            >
                                <span className="font-bold text-gray-800 text-lg">{faq.q}</span>
                                {openIndex === idx ? <Minus className="w-5 h-5 flex-shrink-0" /> : <Plus className="w-5 h-5 flex-shrink-0" />}
                            </button>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-gray-500 py-2 leading-relaxed text-sm">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
