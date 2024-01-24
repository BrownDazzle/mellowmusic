
const URL = `${process.env.NEXT_PUBLIC_API_URL}/views`;

const getViewsCount = async (id: string) => {
    const res = await fetch(`${URL}/${id}`);

    if (res.ok) {
        return null
    }
};

export default getViewsCount;