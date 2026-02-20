import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    try {
        const username = 'kritanta_ai';
        let posts = [];

        try {
            const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                    'X-IG-App-ID': '936619743392459',
                    'Accept': '*/*, application/json'
                },
                timeout: 5000 // Ensure we don't hang
            });

            if (response.status === 200) {
                const data = response.data;
                if (data?.data?.user?.edge_owner_to_timeline_media?.edges) {
                    const edges = data.data.user.edge_owner_to_timeline_media.edges;
                    posts = edges.slice(0, 8).map((edge: { node: { id: string, shortcode: string, display_url: string, is_video: boolean, edge_media_to_caption?: { edges: { node: { text: string } }[] }, __typename: string } }) => {
                        const node = edge.node;
                        return {
                            id: node.id,
                            shortcode: node.shortcode,
                            displayUrl: node.display_url,
                            isVideo: node.is_video,
                            caption: node.edge_media_to_caption?.edges[0]?.node?.text || '',
                            type: node.__typename, // GraphImage, GraphVideo, GraphSidecar
                        };
                    });
                }
            }
        } catch (e: any) {
            console.error("Axios fetch failed for Instagram", e.message);
            return NextResponse.json({ error: 'Failed to fetch Instagram data' }, { status: 500 });
        }

        return NextResponse.json({ posts });
    } catch (error) {
        console.error('Error fetching Instagram feed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
