import { BASE_URL } from './types';

const checkResponse = async (res) => {
    if (res.ok) {
        return res.json();
    }

    const { message } = await res.json();
    const err = new Error(message);
    throw err;
}

export const getIngredientsData = () => {
    return fetch(`${BASE_URL}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
    .then(checkResponse)
}