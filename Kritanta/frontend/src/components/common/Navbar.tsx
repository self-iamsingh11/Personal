'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';

const ANNOUNCEMENT_TEXT = "Use Code: KRITANTA for 10% Off | Free Delivery on Prepaid Orders";

const NAV_LINKS = [
    { name: 'Shop Posters', href: '/shop' },
    { name: 'Multi Posters', href: '/multi-posters' },
    { name: 'Mobile Wallpaper', href: '/mobile-wallpaper' },
    { name: 'Desktop Wallpaper', href: '/desktop-wallpaper' },
    { name: 'Premium Wallpapers', href: '/premium-wallpapers' },
];

export default function Navbar() {
    const { toggleCart, items } = useCartStore();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [announcementHidden, setAnnouncementHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setScrolled(true);
                setAnnouncementHidden(true);
            } else {
                setScrolled(false);
                setAnnouncementHidden(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed w-full z-50 top-0 left-0 transition-transform duration-300 ${announcementHidden ? '-translate-y-[40px]' : 'translate-y-0'}`}>
            {/* Announcement Bar */}
            <div className="h-[40px] bg-black text-white flex items-center justify-center text-[11px] font-bold tracking-wider uppercase">
                {ANNOUNCEMENT_TEXT}
            </div>

            {/* Main Navbar */}
            <nav className="bg-white border-b border-gray-100 h-[80px] flex items-center">
                <div className="container mx-auto px-6 h-full flex items-center justify-between">

                    {/* Left: Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-3xl font-black tracking-tighter uppercase flex items-center gap-1">
                            KRITANTA
                        </Link>
                    </div>

                    {/* Center: Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8 h-full">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="nav-link text-[13px] font-bold uppercase tracking-wide text-black hover:text-accent transition-colors flex items-center gap-1 h-full border-b-2 border-transparent hover:border-black"
                            >
                                {link.name}
                                {['Shop Posters', 'Multi Posters'].includes(link.name) && (
                                    <ChevronDown className="w-3 h-3" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-5">
                        <button className="text-black hover:text-accent transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link href="/account" className="hidden md:block text-black hover:text-accent transition-colors">
                            <User className="w-5 h-5" />
                        </Link>
                        <div
                            onClick={toggleCart}
                            className="relative cursor-pointer text-black hover:text-accent transition-colors"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                                {items.length}
                            </span>
                        </div>
                        {/* Mobile Toggle */}
                        <button className="lg:hidden text-black" onClick={() => setIsOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-[60]"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 left-0 h-full w-[300px] bg-white z-[70] p-6 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-xl font-black uppercase">Menu</span>
                                <button onClick={() => setIsOpen(false)}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex flex-col gap-4">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-sm font-bold uppercase py-3 border-b border-gray-100 flex justify-between items-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <Link href="/account" className="flex items-center gap-3 text-sm font-bold uppercase mb-4">
                                        <User className="w-5 h-5" /> Account
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
