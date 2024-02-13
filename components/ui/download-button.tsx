"use client"
import { handleError } from '@/lib/utils';
import React, { useState } from 'react';
import { Loader } from './loader';

interface DownloadUrl {
    url: string
    title: string
}

const DownloadButton = ({ url, title }: DownloadUrl) => {
    const [loading, setLoading] = useState(false)
    const handleDownload = async () => {
        try {
            // Fetch the file content
            const response = await fetch(url);

            // Check if the request was successful
            if (response.ok) {
                setLoading(true)
                // Convert the response to a blob
                const blob = await response.blob();

                // Create a URL for the blob
                const blobUrl = URL.createObjectURL(blob);

                // Create a link element
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = title; // Set the desired file name for download
                document.body.appendChild(link);

                // Trigger the click event on the link
                link.click();

                // Remove the link and revoke the blob URL
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);
                setLoading(false)
            } else {
                handleError(response.status)
                console.error(`Failed to fetch the file. Status: ${response.status}`);
            }
        } catch (error) {
            handleError(error)
            console.error('Error during file download:', error);
        }
    };


    return (
        <button
            className="bg-fuchsia-950 item-center hover:bg-slate-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline rounded-full mt-5"
            onClick={handleDownload}
        >
            {loading ? (
                <Loader size={25} />
            ) : ` Download`}
        </button>
    );
};

export default DownloadButton;
