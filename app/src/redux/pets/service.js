const getPets = async () => {
    const res = await fetch("http://localhost:3001/pets/all", {
        method: 'GET'
    });
    return res.json();
};

const getSearchResults = async ({searchTerm, sortTerm}) => {
    const res = await fetch(`http://localhost:3001/pets/search?${searchTerm}`, {
        method: 'GET'
    });
    return res.json();
};

const getFilteredPets = async ({age, breed, size, gender, coatLength}) => {
    const res = await fetch(`http://localhost:3001/pets/filter?age=${age}&breed=${breed}&size=${size}&gender=${gender}&coatLength=${coatLength}`, {
        method: 'GET'
    });
    return res.json();
};

export default {
    getPets,
    getSearchResults,
    getFilteredPets
};