'use client';

import ProductCard from './ProductCard';

const DUMMY_PRODUCTS = [
    {
        id: '1',
        title: 'DISCIPLINE | Goggins Gym Motivation | Set Of 4',
        price: 499,
        originalPrice: 899,
        image: '/images/products/product_3.jpg',
        slug: 'discipline-gym-motivation'
    },
    {
        id: '2',
        title: 'BE THE BEST | Andrew Tate Motivation | Poster',
        price: 399,
        originalPrice: 699,
        image: '/images/products/product_2.jpg',
        slug: 'be-the-best'
    },
    {
        id: '3',
        title: 'BTS ARMY | K-Pop Collection | Wall Art',
        price: 499,
        originalPrice: 899,
        image: '/images/products/product_4.jpg',
        slug: 'bts-army'
    },
    {
        id: '4',
        title: 'LOKI | Marvel Series | Poster',
        price: 399,
        originalPrice: 599,
        image: '/images/products/product_7.jpg',
        slug: 'loki-marvel'
    },
    {
        id: '5',
        title: 'Anime Custom Wall Poster',
        price: 499,
        originalPrice: 899,
        image: '/images/products/product_0.jpg',
        slug: 'anime-custom'
    }
];

interface ProductGridProps {
    title: string;
}

export default function ProductGrid({ title }: ProductGridProps) {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black inline-block relative">
                        {title.split(' ').map((word, i) => (
                            <span key={i} className={i === 1 ? 'text-accent' : ''}>{word} </span>
                        ))}
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10">
                    {/* Duplicate products to fill grid if needed */}
                    {[...DUMMY_PRODUCTS, ...DUMMY_PRODUCTS].slice(0, 10).map((product, idx) => (
                        <ProductCard
                            key={`${product.id}-${idx}`}
                            {...product}
                            title={idx % 2 === 0 ? product.title : "Another Cool Poster Title For Testing Length"}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                        View All
                    </button>
                </div>
            </div>
        </section>
    );
}
