import {API_URL, STRAPI_API_TOKEN} from './urls';

export const fetchData = async(endpoint) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
    }
    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();

    return data;
}