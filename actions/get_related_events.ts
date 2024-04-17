
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/related`;

interface Query {
    category?: string;
    eventId?: string;
    page?: number;
    limit?: number;
}

const getRelatedEvents = async (query: Query) => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            category: query.category,
            eventId: query.eventId,
            page: query.page,
            limit: query.limit
        },
    });

    const res = await fetch(url);

    return res.json();
};

export default getRelatedEvents;
