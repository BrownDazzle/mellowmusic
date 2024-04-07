// pages/studio/[id].tsx

import { GetStaticPaths, GetStaticProps } from 'next';


// Import your styles here

// Assuming you have a function to fetch studio data based on ID
const fetchStudioById = async (id: string) => {
    // Implement your data fetching logic here
    // For example, fetch data from an API or a database
    return {
        id,
        name: 'IkuVibes Studios',
        description: 'A state-of-the-art recording studio for music enthusiasts.',
        sessionCharges: 100, // Sample session charge
        socialMedia: {
            instagram: 'awesome_studio_insta',
            twitter: 'awesome_studio_twitter',
            facebook: 'awesome_studio_facebook',
        },
        // Add other details as needed
    };
};

interface StudioPageProps {
    studio: {
        id: string;
        name: string;
        description: string;
        sessionCharges: number;
        socialMedia: {
            instagram: string;
            twitter: string;
            facebook: string;
        };
        // Add other details as needed
    };
}

const StudioPage: React.FC<StudioPageProps> = () => {
    const studio = {
        id: 1,
        name: 'IkuVibes Studios',
        description: 'A state-of-the-art recording studio for music enthusiasts.',
        sessionCharges: 100, // Sample session charge
        socialMedia: {
            instagram: 'awesome_studio_insta',
            twitter: 'awesome_studio_twitter',
            facebook: 'awesome_studio_facebook',
        },
        // Add other details as needed
    };

    return (
        <div className="container mx-auto my-8 py-10">
            <h1 className="text-4xl font-bold mb-4">{studio.name}</h1>
            <p className="text-gray-600 mb-6">{studio.description}</p>

            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Studio Details</h2>
                <p>Session Charges: ${studio.sessionCharges}</p>
                {/* Add other details here */}
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">Social Media</h2>
                <p>
                    Instagram: {studio.socialMedia.instagram}<br />
                    Twitter: {studio.socialMedia.twitter}<br />
                    Facebook: {studio.socialMedia.facebook}
                </p>
            </div>
        </div>
    );
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
    // Assuming you have a function to get all studio IDs
    const studioIds = ['studio1', 'studio2']; // Replace with your actual data
    const paths = studioIds.map((id) => ({ params: { id } }));

    return {
        paths,
        fallback: true, // Show a loading state while data is being fetched at runtime
    };
};

// This function gets called at build time
export const getStaticProps: GetStaticProps<StudioPageProps> = async ({ params }) => {
    const { id } = params as { id: string };
    const studio = await fetchStudioById(id);

    return {
        props: {
            studio,
        },
        revalidate: 60 * 60, // Re-generate this page every 1 hour
    };
};

export default StudioPage;
