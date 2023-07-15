
import {useDispatch, useSelector} from "react-redux";
import {openUpdateView, update} from "../updatePet/updateFormSlice";
import {useState,useEffect} from "react"; 
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";
export default function PetDetail({pet, setOpen, token}){

    const [dashboard, setDashboard] = useState(false);
    const [petInfo, setPetInfo] = useState([]);
    const [email, setEmail] = useState(pet.contactEmail);
    const [number, setNumber] = useState(pet.contactNumber);
    const [name, setName] = useState(pet.contactName);
    const nav = useNavigate();
    useEffect(()=>{
        if(window.location.pathname=="/dashboard"){
            setDashboard(true)
        }
        getPet(pet._id)
    },[])

    const getPet = async (id) => {
        const link = `http://localhost:3001/pets/${id}`;
        const res = await fetch(link, {
            method: 'GET'
        });
        const data = await res.json();
        setPetInfo(data)
        console.log(data)
    };

    const deletePet = async (id) => {
        console.log(token)
        const res = await fetch(`http://localhost:3001/pets/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
        });
        const data = await res.json();
        if (!res.ok) {
            const error = data?.message;
            alert("Delete fail")
        }else(nav("/dashboard"))
    };

    const updatePet = async (id) => {
        let input={
            contactName:name,
            contactEmail:email,
            contactNumber:number,
        }
       alert(token)
        const res = await fetch(`http://localhost:3001/pets/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
            body:JSON.stringify(input)
        });
        const data = await res.json();
        console.log(data)
        if (!res.ok) {
            const error = data?.message;
            alert("update fail")
        }
        return data;
    };
    

    return (
            <aside className="popupWindow">
            <div className="detail">
                <img src={petInfo.picture} alt="Not available"/>
                <h3>{petInfo.petName}</h3>
                <p>Breed: {petInfo.breed}</p>
                <p>Gender: {petInfo.gender}</p>
                <p>Age: {Math.floor(petInfo.age/12) + " Year " + petInfo.age%12 + " Month"}</p>
                <p>Description:{petInfo.description}</p>
                <div className="horizontalLine"></div>
                <h3>Contact Information</h3>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="outlined-helperText"
                    label="Helper text"
                    defaultValue={name}
                    helperText="name"
                    onChange={e => setName(e.target.value)}
                    sx={{border:"1px solid transparent !important"}}
                  />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="outlined-helperText"
                    label="Helper text"
                    defaultValue={number}
                    helperText="number"
                    onChange={e => setNumber(e.target.value)}
                  />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="outlined-helperText"
                    label="Helper text"
                    defaultValue={email}
                    helperText="email"
                    onChange={e => setEmail(e.target.value)}
                  />
                <div className='btn-container'>
                    {dashboard?(
                        <>
                        <button
                        className="updateItemButton"
                        onClick={ () => {
                           updatePet(pet._id)
                            setOpen(false)
                        } }>
                        Update
                    </button>
                    <button
                        className="deleteItemButton"
                        onClick={ () => {
                            deletePet(pet._id)
                            setOpen(false)
                        } }>
                        Delete
                    </button>
                        </>
                    ):(
                        <></>
                    )}
                    <button
                        className="close"
                        onClick={ () => {
                            setOpen(false)
                        } }>
                        Close
                    </button>

                </div>
            </div>
        </aside>

    )
}