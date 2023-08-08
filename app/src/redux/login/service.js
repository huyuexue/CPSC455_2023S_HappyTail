//const baseURL = 'http://happytails.tech:3001';
const baseURL = 'http://localhost:3001';


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