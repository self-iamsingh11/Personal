'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Layers } from 'lucide-react';

interface InstagramPost {
    id: string;
    shortcode: string;
    displayUrl: string;
    isVideo: boolean;
    caption: string;
    type: string;
}

export default function InstagramGrid() {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/instagram');
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data.posts || []);
                }
            } catch (error) {
                console.error("Failed to fetch Instagram feed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <section className="bg-white py-4 md:py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">
                            Instagram Feed
                        </h2>
                    </div>
                    {/* Skeletons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (posts.length === 0) return null;

    return (
        <section className="bg-white py-4 md:py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">
                        Instagram Feed
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`https://www.instagram.com/p/${post.shortcode}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src={post.displayUrl}
                                alt={post.caption.slice(0, 50) || "Instagram post"}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="text-white text-center p-4">
                                    <p className="text-sm font-semibold line-clamp-3">
                                        {post.caption}
                                    </p>
                                </div>
                            </div>

                            {/* Media Type Icons */}
                            {post.isVideo && (
                                <div className="absolute top-3 right-3 text-white drop-shadow-md">
                                    <Play fill="currentColor" className="w-6 h-6" />
                                </div>
                            )}
                            {post.type === "GraphSidecar" && (
                                <div className="absolute top-3 right-3 text-white drop-shadow-md">
                                    <Layers fill="currentColor" className="w-6 h-6" />
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
