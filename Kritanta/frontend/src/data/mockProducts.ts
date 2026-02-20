export interface Product {
    id: string;
    title: string;
    slug: string;
    price: number;
    originalPrice: number;
    images: string[];
    description: string;
    category: string;
    tags: string[];
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'DISCIPLINE | Goggins Gym Motivation | Set Of 4',
        slug: 'discipline-gym-motivation',
        price: 499,
        originalPrice: 899,
        images: [
            '/images/products/product_3.jpg',
            '/images/hero/wall_2.jpg', // Mock extra images
            '/images/hero/wall_3.jpg'
        ],
        description: 'Elevate your workspace or gym with this powerful set of 4 motivational posters featuring David Goggins. Printed on high-quality 300GSM art paper for a premium finish.',
        category: 'Motivation',
        tags: ['Gym', 'Motivation', 'Set']
    },
    {
        id: '2',
        title: 'BE THE BEST | Andrew Tate Motivation | Poster',
        slug: 'be-the-best',
        price: 399,
        originalPrice: 699,
        images: [
            '/images/products/product_2.jpg',
            '/images/hero/wall_4.jpg'
        ],
        description: 'Unleash your potential with the "Be The Best" poster. A daily reminder to strive for excellence.',
        category: 'Motivation',
        tags: ['Motivation', 'Success']
    },
    {
        id: '3',
        title: 'BTS ARMY | K-Pop Collection | Wall Art',
        slug: 'bts-army',
        price: 499,
        originalPrice: 899,
        images: [
            '/images/products/product_4.jpg',
            '/images/categories/music.jpg'
        ],
        description: 'Show your love for BTS with this exclusive Army edition poster. Perfect for any K-Pop fan\'s room.',
        category: 'Music',
        tags: ['K-Pop', 'BTS', 'Music']
    },
    {
        id: '4',
        title: 'LOKI | Marvel Series | Poster',
        slug: 'loki-marvel',
        price: 399,
        originalPrice: 599,
        images: [
            '/images/products/product_7.jpg',
            '/images/categories/movies.jpg'
        ],
        description: 'The God of Mischief in all his glory. Official Marvel licensed artwork for the Loki series.',
        category: 'Movies',
        tags: ['Marvel', 'TV Series', 'Superhero']
    },
    {
        id: '5',
        title: 'Anime Custom Wall Poster',
        slug: 'anime-custom',
        price: 499,
        originalPrice: 899,
        images: [
            '/images/products/product_0.jpg',
            '/images/categories/anime.jpg'
        ],
        description: 'Customize your space with your favorite anime characters. High-definition print quality assured.',
        category: 'Anime',
        tags: ['Anime', 'Custom']
    }
];

export function getProduct(slug: string): Product | undefined {
    return PRODUCTS.find(p => p.slug === slug);
}
