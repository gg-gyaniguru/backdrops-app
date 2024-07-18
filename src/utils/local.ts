const setKey = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const getKey = (key: string) => {
    const get = localStorage.getItem(key);
    if (get) {
        return JSON.parse(get);
    }
    return null;
}

const removeKey = (key: string) => {
    localStorage.setItem(key, JSON.stringify(null));
}

export {setKey, getKey, removeKey};