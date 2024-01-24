
const URL = `${process.env.NEXT_PUBLIC_API_URL}/genres`;

const getGenre = async () => {
    const res = await fetch(`${URL}`);

    return res.json();
};

export default getGenre;
