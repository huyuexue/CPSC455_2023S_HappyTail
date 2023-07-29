const baseUrl = "https://happytails-be-alpha.onrender.com";

const getPets = async () => {
    const res = await fetch(`${baseUrl}/pets/all`, {
        method: 'GET'
    });
    return res.json();
};

const getSearchResults = async ({searchTerm, sortTerm}) => {
    const res = await fetch(`${baseUrl}/pets/search?${searchTerm}`, {
        method: 'GET'
    });
    return res.json();
};

export default {
    getPets,
    getSearchResults,
};