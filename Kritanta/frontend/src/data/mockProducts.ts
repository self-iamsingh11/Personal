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
        description: 'Elevate your workspace or gym with this powerful set of 4 motivational wallpapers featuring David Goggins. High-resolution digital download.',
        category: 'Motivation',
        tags: ['Gym', 'Motivation', 'Set']
    },
    {
        id: '2',
        title: 'BE THE BEST | Andrew Tate Motivation | Wallpaper',
        slug: 'be-the-best',
        price: 399,
        originalPrice: 699,
        images: [
            '/images/products/product_2.jpg',
            '/images/hero/wall_4.jpg'
        ],
        description: 'Unleash your potential with the "Be The Best" wallpaper. A daily reminder to strive for excellence. Perfect for mobile or desktop.',
        category: 'Motivation',
        tags: ['Motivation', 'Success']
    },
    {
        id: '3',
        title: 'BTS ARMY | K-Pop Collection | Wallpaper',
        slug: 'bts-army',
        price: 499,
        originalPrice: 899,
        images: [
            '/images/products/product_4.jpg',
            '/images/categories/music.jpg'
        ],
        description: 'Show your love for BTS with this exclusive Army edition wallpaper. Perfect for any K-Pop fan\'s digital devices.',
        category: 'Music',
        tags: ['K-Pop', 'BTS', 'Music']
    },
    {
        id: '4',
        title: 'LOKI | Marvel Series | Wallpaper',
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
        title: 'Anime Custom Wallpaper',
        slug: 'anime-custom',
        price: 499,
        originalPrice: 899,
        images: [
            '/images/products/product_0.jpg',
            '/images/categories/anime.jpg'
        ],
        description: 'Customize your screens with your favorite anime characters. High-definition digital format assured.',
        category: 'Anime',
        tags: ['Anime', 'Custom']
    }
];

export function getProduct(slug: string): Product | undefined {
    return PRODUCTS.find(p => p.slug === slug);
}
