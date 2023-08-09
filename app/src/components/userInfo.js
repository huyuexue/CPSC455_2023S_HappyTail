import * as React from "react";
import { Stack, TextField,Button, Typography, FormControl, RadioGroup, FormControlLabel, Radio} from "@mui/material";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAsync } from "../redux/login/thunks";
export default function UserInfo({setNextStep}) {
    const token = useSelector(state => state.login.token);
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [number, setNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [petfinder, setPetfinder] = useState(false);
    const [error, setError]=useState("")
    const nav = useNavigate();
    const dispatch = useDispatch()
    const userSignup=async ()=>{

        let input={
            lastName: lastName,
            firstName: firstName,
            number:number,
            postCode:postalCode,
            city:city,
            address:address,
            petOwner:petfinder
        }

        console.log( "input is ", input)
        const res = await fetch("http://localhost:3001/users/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token},
            body: JSON.stringify(input)
        });
        const data=await res.json();

        if(res.status!=200){
            setError(data?.message)
        }else{
            dispatch(getUserAsync({token}));
            nav("/dashboard")
        }
       }

    const submit=()=>{
        userSignup()
    }

    return (
        <Stack spacing={4}>
            <FormControl sx={{ display:"flex", justifyContent:"center", alignItems:"center"}}>
                <RadioGroup
                    row
                    value={petfinder}
                    onChange={(e)=>{setPetfinder(e.target.value); console.log(petfinder)}}>
                    <FormControlLabel value={false} control={<Radio />} label="I'm currently seeking a new home for a pet."  />
                    <FormControlLabel value={true} control={<Radio />} label="I'm interested in adopting a pet." />
                </RadioGroup>
            </FormControl>

            <TextField
                label="First Name"
                value={firstName}
                onChange={e =>setFirstName(e.target.value)}
                variant="filled"/>
            <TextField
                label="Last Name"
                value={lastName}
                onChange={e =>setlastName(e.target.value)}/>
            <TextField
                label="Number"
                value={number}
                onChange={e =>setNumber(e.target.value)}/>
            <TextField
                label="Postal Code"
                value={postalCode}
                onChange={e =>setPostalCode(e.target.value)}/>
            <TextField
                label="Address"
                value={address}
                onChange={e =>setAddress(e.target.value)}/>
            <TextField
                label="City"
                value={city}
                onChange={e =>setCity(e.target.value)}
            />
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2}}
                onClick={()=>{ submit()}}>
                next step
            </Button>

            <Typography sx={{color:"red", fontSize: "12px", marginY:"12px"}}>
                  {error}
                </Typography>       
        </Stack>
    );
}
