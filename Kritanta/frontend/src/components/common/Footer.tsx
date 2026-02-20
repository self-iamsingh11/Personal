'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-16 border-t border-gray-800">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 pb-12">
                {/* Brand */}
                <div className="md:col-span-1">
                    <Link href="/" className="text-3xl font-black tracking-tighter uppercase mb-6 block">
                        KRITANTA
                    </Link>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        India&apos;s No. 1 Custom Wallpaper Store. Transform your screens with our premium quality wallpapers and custom digital prints.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-accent transition-colors">
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-accent transition-colors">
                            <Facebook className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-accent transition-colors">
                            <Twitter className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-bold uppercase tracking-wider mb-6 text-sm text-gray-400">Shop</h3>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><Link href="/shop" className="hover:text-accent transition-colors">All Wallpapers</Link></li>
                        <li><Link href="/best-selling" className="hover:text-accent transition-colors">Best Selling</Link></li>
                        <li><Link href="/new-drops" className="hover:text-accent transition-colors">New Drops</Link></li>
                        <li><Link href="/collections" className="hover:text-accent transition-colors">Collections</Link></li>
                        <li><Link href="/custom" className="hover:text-accent transition-colors">Custom Wallpapers</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="font-bold uppercase tracking-wider mb-6 text-sm text-gray-400">Support</h3>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><Link href="/track-order" className="hover:text-accent transition-colors">Track Order</Link></li>
                        <li><Link href="/shipping-policy" className="hover:text-accent transition-colors">Shipping Policy</Link></li>
                        <li><Link href="/returns" className="hover:text-accent transition-colors">Returns & Refund</Link></li>
                        <li><Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
                        <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-bold uppercase tracking-wider mb-6 text-sm text-gray-400">Contact Us</h3>
                    <ul className="space-y-4 text-sm font-medium">
                        <li className="flex gap-3 text-gray-300">
                            <MapPin className="w-5 h-5 flex-shrink-0 text-gray-500" />
                            <span>123, Wallpaper Street, Koramangala, Bangalore - 560034</span>
                        </li>
                        <li className="flex gap-3 text-gray-300">
                            <Phone className="w-5 h-5 flex-shrink-0 text-gray-500" />
                            <span>+91 98765 43210</span>
                        </li>
                        <li className="flex gap-3 text-gray-300">
                            <Mail className="w-5 h-5 flex-shrink-0 text-gray-500" />
                            <span>support@kritanta.in</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-accent py-4 text-center">
                <p className="text-white text-xs font-bold uppercase tracking-wide">
                    © 2024 Kritanta. Made with ❤️ in India.
                </p>
            </div>
        </footer>
    );
}
