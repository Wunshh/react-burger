import { BASE_URL } from './data';
import { getCookie } from './cookie';

const checkResponse = async (res: Response) => {
    if (res.ok) {
        return res.json();
    }

    const { message } = await res.json();
    const err = new Error(message);
    throw err;
}


export const register = (email: string, name: string, password: string) => { 
    return fetch(`${BASE_URL}/auth/register`, { 
        method: 'POST', 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, name, password})
    }) 
    .then(checkResponse)
}

export const login = (email: string, password: string) => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: 'POST', 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({password, email}) 
    })
    .then(checkResponse)
}

export const forgotPassword = (email: string) => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: 'POST', 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({email}) 
    })
    .then(checkResponse)
}

export const reset = (password: string, token: string) => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST', 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password, token}) 
    })
    .then(checkResponse)
}

export const getUserData = () => {
    return fetch(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': getCookie('accessToken')
        }
    })
    .then(checkResponse)
}

export const updateToken = () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': getCookie('accessToken')
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
    .then(checkResponse)
}

export const updateUserData = (email: string, name: string, password: string) => {

    return fetch(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': getCookie('accessToken')
        },
        body: password === '*********' ? 
        JSON.stringify({
            email: email || '',
            name: name || ''
        })
        : 
        JSON.stringify({
            email: email || '',
            name: name || '',
            password: password
        })
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

export const sendOrder = (itemsId: Array<string>) => {
    return fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': getCookie('accessToken')
        },
        body: JSON.stringify({
            ingredients: itemsId
        })
    })
    .then(checkResponse)
}