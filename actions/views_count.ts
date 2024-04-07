
const URL = `${process.env.NEXT_PUBLIC_API_URL}/views`;

const getViewsCount = async (id: string) => {
    return await fetch(`${URL}/${id}`);

};

export default getViewsCount;