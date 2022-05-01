import { BASE_URL } from './data';
import { getCookie } from './cookie';

const checkResponse = async (res) => {
    if (res.ok) {
        return res.json();
    }

    const { message } = await res.json();
    const err = new Error(message);
    throw err;
}

export const register = (email, name, password) => { 
    return fetch(`${BASE_URL}/auth/register`, { 
        method: 'POST', 
        headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify({email, name, password})
    }) 
    .then(checkResponse)
}

export const login = (email, password) => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: 'POST', 
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({password, email}) 
    })
    .then(checkResponse)
}

export const forgotPassword = (email) => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: 'POST', 
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({email}) 
    })
    .then(checkResponse)
}

export const reset = (password, token) => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST', 
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({password, token}) 
    })
    .then(checkResponse)
}

// export const updateUser = () => {

// }

export const getUserData = () => {
    return fetch(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': getCookie('accessToken'), 
        },
    })
    .then(checkResponse)
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