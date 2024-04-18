"use client"
import { handleError } from '@/lib/utils';
import React, { useState } from 'react';
import { Loader } from './loader';
import { HiDownload } from 'react-icons/hi';

interface DownloadUrl {
    url: string
    title: string
}

const DownloadButtonCopy = ({ url, title }: DownloadUrl) => {
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
            className="bg-slate-900 item-center hover:scale-110 transition hover:cursor-pointer text-white font-bold rounded focus:outline-none focus:shadow-outline "
            onClick={handleDownload}
        >
            {loading ? (
                <Loader size={25} />
            ) : (<HiDownload size={28} className='bg-slate-900 rounded-full' />)}
        </button>
    );
};

export default DownloadButtonCopy;
