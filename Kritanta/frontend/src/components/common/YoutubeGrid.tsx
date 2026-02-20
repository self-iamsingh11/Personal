'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface YouTubeVideo {
    title: string;
    videoId: string;
    videoThumbnails: { url: string; width: number; height: number }[];
    viewCount: number;
    publishedText: string;
    lengthText: string;
}

export default function YoutubeGrid() {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('/api/youtube');
                if (response.ok) {
                    const data = await response.json();
                    setVideos(data.videos || []);
                }
            } catch (error) {
                console.error("Failed to fetch YouTube videos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <section className="bg-white py-4 md:py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">
                            Youtube Videos
                        </h2>
                    </div>
                    {/* Skeletons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="aspect-video bg-gray-100 animate-pulse rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (videos.length === 0) return null;

    return (
        <section className="bg-white py-4 md:py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">
                        Youtube Videos
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {videos.map((video) => (
                        <div key={video.videoId} className="flex flex-col gap-3 group">
                            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                {activeVideoId === video.videoId ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0"
                                    ></iframe>
                                ) : (
                                    <div
                                        className="absolute inset-0 cursor-pointer"
                                        onClick={() => setActiveVideoId(video.videoId)}
                                    >
                                        <Image
                                            src={video.videoThumbnails.find(t => t.width >= 480)?.url || video.videoThumbnails[0]?.url || `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`}
                                            alt={video.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                                            {video.lengthText}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-sm line-clamp-2 leading-snug group-hover:text-red-600 transition-colors cursor-pointer" onClick={() => !activeVideoId && setActiveVideoId(video.videoId)}>
                                    {video.title}
                                </h3>
                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                    <span>{video.publishedText}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
