import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export async function GET() {
    try {
        const parser = new Parser({
            customFields: {
                item: ['media:group', 'published', 'yt:videoId'],
            }
        });

        // The channel ID for Kritanta AI
        const channelId = 'UCCn_W93CEO33YRLJmydwrNQ';
        const feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);

        if (!feed || !feed.items) {
            return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
        }

        const videos = feed.items.slice(0, 8).map(item => {
            const mediaGroup = item['media:group'];
            const thumbnail = mediaGroup?.['media:thumbnail']?.[0]?.$?.url || `https://i.ytimg.com/vi/${item['yt:videoId']}/maxresdefault.jpg`;
            const views = mediaGroup?.['media:community']?.[0]?.['media:statistics']?.[0]?.$?.views || 0;

            // Format date loosely
            const publishedAt = new Date(item.pubDate!).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            });

            return {
                title: item.title,
                videoId: item['yt:videoId'],
                videoThumbnails: [{ url: thumbnail, width: null, height: null }],
                viewCount: views,
                publishedText: publishedAt,
                lengthText: 'Video' // Feed doesn't give length easily
            };
        });

        return NextResponse.json({ videos });
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
