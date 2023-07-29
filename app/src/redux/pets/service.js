const getPets = async () => {
    const res = await fetch("http://happytails.tech:3001/pets/all", {
        method: 'GET'
    });
    return res.json();
};

const getSearchResults = async ({searchTerm, sortTerm}) => {
    const res = await fetch(`http://happytails.tech:3001/pets/search?${searchTerm}`, {
        method: 'GET'
    });
    return res.json();
};

export default {
    getPets,
    getSearchResults,
};