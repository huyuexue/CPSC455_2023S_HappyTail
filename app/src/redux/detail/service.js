
const getPet = async (id) => {
    const link = `https://ht-backend.onrender.com/pets/${id.id}`;
    const res = await fetch(link, {
        method: 'GET'
    });
    return res.json();
};

export default {
    getPet,
};