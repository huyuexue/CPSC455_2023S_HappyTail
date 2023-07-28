const getPets = async () => {
    const res = await fetch("https://ht-backend.onrender.com/pets/all", {
        method: 'GET'
    });
    return res.json();
};

const getSearchResults = async ({searchTerm, sortTerm}) => {
    const res = await fetch(`https://ht-backend.onrender.com/pets/search?${searchTerm}`, {
        method: 'GET'
    });
    return res.json();
};

export default {
    getPets,
    getSearchResults,
};