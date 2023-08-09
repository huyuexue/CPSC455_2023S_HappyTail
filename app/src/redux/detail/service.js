const baseURL = 'https://happytails-be-alpha.onrender.com';

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