
const URL = `${process.env.NEXT_PUBLIC_API_URL}/views`;

const getViewsCount = async (id: string) => {
    const res = await fetch(`${URL}/${id}`);

    const data = await res.json();
    console.log("COUNT", data)

    return data;
};

export default getViewsCount;