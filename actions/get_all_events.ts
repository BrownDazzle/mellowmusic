
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    query?: string;
    type?: string;
    genre?: string;
    page?: number;
    limit?: number;
}

const getProducts = async (query: Query) => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            query: query.query,
            type: query.type,
            genre: query.genre,
            page: query.page,
            limit: query.limit
        },
    });

    const res = await fetch(url);

    return res.json();
};

export default getProducts;
