// pages/About.tsx
import React from 'react';

const About: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900">About IkuVibes</h1>
            <p className="mt-4 text-lg text-gray-500">
                Welcome to IkuVibes.com, your ultimate destination for music and video streaming and download. Our platform is designed to bring you a seamless and enjoyable experience in discovering and enjoying your favorite entertainment content.
            </p>

            <h2 className="mt-8 text-1xl font-extrabold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-500">
                At IkuVibes, we are on a mission to provide a diverse and extensive collection of music and videos to cater to every taste and preference. We strive to create a platform that connects artists with their audience and offers a wide range of entertainment options.
            </p>

            <h2 className="mt-8 text-1xl font-extrabold text-gray-900">Key Features</h2>
            <ul className="mt-4 text-lg text-gray-500 list-disc pl-5">
                <li>Extensive Music Library</li>
                <li>High-Quality Video Streaming</li>
                <li>Downloadable Content</li>
                <li>User-Friendly Interface</li>
            </ul>

            <h2 className="mt-8 text-1xl font-extrabold text-gray-900">Contact Us</h2>
            <p className="mt-4 text-lg text-gray-500">
                Have questions or feedback? Feel free to reach out to us at <a href="mailto:ikuvibes@gmail.com" className="text-blue-500">ikuvibes@gmail.com</a>. We value your input and are here to assist you.
            </p>
        </div>
    );
};

export default About;
