export const addContactData = (contact) => {
    setStorage('contacts', contact);
};

export const getStorage = (key) => {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : [];
};

export const setStorage = (key, obj) => {
    const data = getStorage(key);

    data.push(obj);
    localStorage.setItem(key, JSON.stringify(data));
};

export const removeStorage = (tel) => {
    const key = 'contacts';
    const data = getStorage(key);
    const filteredData = data.filter(contact => contact.phone !== tel);

    localStorage.setItem(key, JSON.stringify(filteredData));
}