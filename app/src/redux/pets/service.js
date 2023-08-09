const baseURL = 'http://localhost:3001';
const getPets = async () => {
    const res = await fetch(`${baseURL}/pets/all`, {
        method: 'GET'
    });
    return res.json();
};

const getSearchResults = async ({searchTerm, sortTerm}) => {
    const res = await fetch(`${baseURL}/pets/search?${searchTerm}`, {
        method: 'GET'
    });
    return res.json();
};

export default {
    getPets,
    getSearchResults,
};