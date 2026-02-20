'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
    { q: "Is it possible to order posters in bulk for my outlet or any other setting?", a: "Yes! We cater to bulk orders, especially for businesses. Simply drop us a message on WhatsApp for special rates and assistance." },
    { q: "how can I order my own design as a print?", a: "Go to our 'Custom Poster' section, upload your high-quality image, select the size/finish, and place your order!" },
    { q: "How many days taken for delivery?", a: "Typically 5-7 business days for standard delivery across India." },
    { q: "How can I check the status of my order?", a: "You can track your order status from the 'My Account' section or use the tracking link sent to your email." },
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
