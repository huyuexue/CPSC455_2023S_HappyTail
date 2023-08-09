const baseURL = 'https://happytails-be-alpha.onrender.com';


const getUser = async ({token}) => {
    const res = await fetch(`${baseURL}/users/byId`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: token,
        }
    });
    return res.json();
};


export default {
    getUser,
};