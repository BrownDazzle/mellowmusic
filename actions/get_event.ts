
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string) => {
    try {

        const res = await fetch(`${URL}/${id}`);
        const data = await res.json()

        return data;

    } catch (error) {
        console.log("EVENT_ERR", error)
    }
};

export default getProduct;
