'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { getProduct, PRODUCTS } from '@/data/mockProducts';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductCard from '@/components/common/ProductCard';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const product = getProduct(resolvedParams.slug);

    if (!product) {
        notFound();
    }

    // Mock Related Products (Exclude current, show 4)
    const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

    return (
        <main className="min-h-screen bg-white pb-20 pt-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs (Optional) */}
                <nav className="text-xs text-gray-500 mb-6 uppercase tracking-wider">
                    Home / Products / <span className="text-black font-bold">{product.title}</span>
                </nav>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <ProductGallery images={product.images} />
                    <ProductInfo product={product} />
                </div>

                {/* Related Products */}
                <section>
                    <div className="flex items-center justify-center mb-10 relative">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-black z-10 bg-white px-4">
                            You May Also Like
                        </h2>
                        <div className="absolute w-full h-[1px] bg-gray-200 top-1/2 -z-0"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
                        {relatedProducts.map((p) => (
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
                </section>
            </div>
        </main>
    );
}
