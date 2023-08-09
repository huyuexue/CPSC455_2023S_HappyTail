const baseURL = 'http://localhost:3001';

const getPet = async (id) => {
    const link = `${baseURL}/pets/${id.id}`;
    const res = await fetch(link, {
        method: 'GET'
    });
    return res.json();
};

export default {
    getPet,
};