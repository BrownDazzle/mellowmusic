// pages/artists.tsx

import getEvents from '@/actions/get_events';
import React from 'react';

interface Artist {
    id: number;
    name: string;
    genre: string;
    description: string;
    imageUrl: string;
    socialMedia: {
        twitter?: string;
        instagram?: string;
        facebook?: string;
        spotify?: string;
    };
}


const ArtistsPage: React.FC = async () => {
    const acts = await getEvents();
    const act = await acts[1]
    // Add more artists as needed

    const artists: Artist[] = [
        {
            id: 1,
            name: act?.artist,
            genre: 'Pop',
            description: 'A talented pop artist with a unique style.',
            imageUrl: act?.imageUrl,
            socialMedia: {
                twitter: 'https://twitter.com/johndoe',
                instagram: 'https://www.instagram.com/johndoe/',
                facebook: 'https://www.facebook.com/johndoe',
                spotify: 'https://open.spotify.com/artist/johndoe',
            },
        },
        // Add more artists as needed
    ];

    return (
        <div className="container mx-auto mt-8 py-10">
            <h1 className="text-4xl font-bold mb-6">Featured Artists</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {acts.map((artist: any) => (
                    <div key={artist.id} className="bg-white p-6 rounded-lg shadow-md">
                        <img
                            src={artist.imageUrl}
                            alt={artist.name}
                            className="w-full h-48 object-cover mb-4 rounded-lg"
                        />
                        <h2 className="text-xl font-semibold mb-2">{artist.artist}</h2>
                        <p className="text-gray-600 mb-4">{artist.genre.name}</p>
                        <p className="text-gray-800 mb-4">{artist.description}</p>
                        <div className="flex space-x-4">
                            {artists[0].socialMedia.twitter && (
                                <a href={artists[0].socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                                    <img src="/facebook.svg" alt="Facebook" className="w-6 h-6" />
                                </a>
                            )}
                            {artists[0].socialMedia.instagram && (
                                <a href={artists[0].socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                                    <img src="/instagram.svg" alt="Instagram" className="w-6 h-6" />
                                </a>
                            )}
                            {artists[0].socialMedia.facebook && (
                                <a href={artists[0].socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                                    <img src="/twitter.svg" alt="Twitter" className="w-6 h-6" />
                                </a>
                            )}
                            {artists[0].socialMedia.spotify && (
                                <a href={artists[0].socialMedia.spotify} target="_blank" rel="noopener noreferrer">
                                    <img src="/youtube.svg" alt="Youtube" className="w-6 h-6" />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArtistsPage;
