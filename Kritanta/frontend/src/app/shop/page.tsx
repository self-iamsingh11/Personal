'use client';

import { PRODUCTS } from '@/data/mockProducts';
import ProductCard from '@/components/common/ProductCard';
import FilterSidebar from '@/components/shop/FilterSidebar';
import { ChevronDown } from 'lucide-react';

export default function ShopPage() {
    return (
        <main className="min-h-screen bg-white pt-8 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 border-b border-gray-200 pb-4">
                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Shop All</h1>

                    {/* Sort Dropdown */}
                    <div className="relative group mt-4 md:mt-0">
                        <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                            Sort By: Featured
                            <ChevronDown size={16} />
                        </button>
                        {/* Dropdown would go here */}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar */}
                    <div className="hidden md:block">
                        <FilterSidebar />
                    </div>

                    {/* Mobile Filter Toggle (Hidden on Desktop) */}
                    <div className="md:hidden w-full mb-6">
                        <button className="w-full border border-black py-3 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                            Filters
                            <ChevronDown size={16} />
                        </button>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-6">{PRODUCTS.length} Products</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                            {PRODUCTS.map((p) => (
                                <ProductCard
                                    key={p.id}
                                    title={p.title}
                                    price={p.price}
                                    originalPrice={p.originalPrice}
                                    image={p.images[0]}
                                    slug={p.slug}
                                />
                            ))}
                        </div>

                        {/* Pagination / Load More */}
                        <div className="mt-20 text-center">
                            <span className="text-xs text-gray-400 uppercase tracking-widest">End of results</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
