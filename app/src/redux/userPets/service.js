const baseUrl = "https://happytails-be-alpha.onrender.com";

const getUserPets = async ({token}) => {
    const res = await fetch(`${baseUrl}/pets/byuser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: token,
        }
    });
    return res.json();
};

const addPet = async ({input, token}) => {
    const res = await fetch(`${baseUrl}/pets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: token,
        },
        body: JSON.stringify(input)
    });

    const data = await res.json();
    if (!res.ok) {
        const error = data?.message;
        throw new Error (error);
    }
    return data;
};

const deletePet = async ({id,token}) => {
    const res = await fetch(`${baseUrl}/pets/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: token,
        },
    });
    const data = await res.json();
    if (!res.ok) {
        const error = data?.message;
        throw new Error (error);
    }
    return data;
};

const updatePet = async ({pet, token}) => {
    const link = `${baseUrl}/pets/${pet._id}`;
    const res = await fetch(link, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: token,
        },
        body: JSON.stringify({pet})
    });
    const data = await res.json();
    if (!res.ok) {
        const error = data?.message;
        throw new Error (error);
    }
    return data;
};

export default {
    getUserPets,
    addPet,
    deletePet,
    updatePet,
};