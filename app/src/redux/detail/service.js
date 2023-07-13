
const getPet = async (id) => {
    const link = `http://localhost:3001/pets/${id.id}`;
    const res = await fetch(link, {
        method: 'GET'
    });
    return res.json();
};

const updatePet = async ({id}) => {
    const link = `http://localhost:3001/pets/${id}`;
    const res = await fetch(link, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    const data = await res.json();
    if (!res.ok) {
        const error = data?.message;
        throw new Error (error);
    }
    return data;
};

export default {
    getPet,
    updatePet
};