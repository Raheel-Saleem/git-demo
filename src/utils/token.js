export const getToken = () => {
    return window.localStorage.getItem('MY_TOKEN');
};

export const setToken = (token) => {
    return window.localStorage.setItem('MY_TOKEN', token);
};

export const removeToken = () => {
    return window.localStorage.removeItem('MY_TOKEN');
};
