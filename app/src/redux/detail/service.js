
const getPet = async (id) => {
    const link = `http://localhost:3001/pets/${id.id}`;
    const res = await fetch(link, {
        method: 'GET'
    });
    return res.json();
};

export default {
    getPet,
};