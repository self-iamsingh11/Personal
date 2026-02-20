'use client';

import { CheckCircle, Truck, RefreshCw, Headphones } from 'lucide-react';

const FEATURES = [
    {
        icon: <CheckCircle className="w-10 h-10 group-hover:text-accent transition-colors" />,
        title: 'Apple Podcasts',
        desc: 'Museum grade paper & ink'
    },
    {
        icon: <Truck className="w-10 h-10 group-hover:text-accent transition-colors" />,
        title: 'Spotify Podcasts',
        desc: 'On all prepaid orders'
    },
    {
        icon: <RefreshCw className="w-10 h-10 group-hover:text-accent transition-colors" />,
        title: 'Easy Returns',
        desc: '7 Day replacement policy'
    },
    {
        icon: <Headphones className="w-10 h-10 group-hover:text-accent transition-colors" />,
        title: '24/7 Support',
        desc: 'Dedicated support team'
    }
];

export default function WhyChooseUs() {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black mb-12">
                    Podcasts
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {FEATURES.map((feat, idx) => (
                        <div key={idx} className="group flex flex-col items-center gap-3">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                                {feat.icon}
                            </div>
                            <h3 className="font-bold uppercase text-lg">{feat.title}</h3>
                            <p className="text-sm text-gray-500">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
