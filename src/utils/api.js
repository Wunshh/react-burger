import { BASE_URL } from './data';

const checkResponse = async (res) => {
    if (res.ok) {
        return res.json();
    }

    const { message } = await res.json();
    const err = new Error(message);
    throw err;
}

export const getIngredientsData = () => {
    return fetch(`${BASE_URL}/ingredients`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
    .then(checkResponse)
}

export const sendOrder = (itemsId) => {
    return fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingredients: itemsId
        })
    })
    .then(checkResponse)
}