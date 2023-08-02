import * as React from "react";
import {Input, Stack, TextField,Button, Typography} from "@mui/material";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function UserInfo({setNextStep}) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [number, setNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [error, setError]=useState("")
    const nav = useNavigate();

    const userSignup=async ()=>{

        let input={
            lastName: lastName,
            firstName: firstName,
            number:number,
            postCode:postalCode,
            city:city,
            address:address,
        }

        console.log( "input is ", input)
        const token= localStorage.getItem("token")
        const res = await fetch("http://localhost:3001/users/signup", {
          method: 'POST',
          headers: { 
                      'Content-Type': 'application/json',
                      authorization: token},
          body: JSON.stringify(input)
        });
        const data=await res.json();
        console.log(data)

        if(res.status!=200){
            setError(data?.message)
          
        }else{
            nav("/dashboard")
        }
       }

    const submit=()=>{
        userSignup()
    }

    return (

        <Stack spacing={4}>
            <TextField
                label="First Name"
                value={firstName}
                onChange={e =>setFirstName(e.target.value)}
                variant="filled"
            />
            <TextField
                label="Last Name"
                value={lastName}
                onChange={e =>setlastName(e.target.value)}
            />

            <TextField
                label="Number"
                value={number}
                onChange={e =>setNumber(e.target.value)}
            />
            <TextField
                label="Postal Code"
                value={postalCode}
                onChange={e =>setPostalCode(e.target.value)}
            />
            <TextField
                label="Address"
                value={address}
                onChange={e =>setAddress(e.target.value)}
            />
            <TextField
                label="City"
                value={city}
                onChange={e =>setCity(e.target.value)}
            />
                                <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2}}
                      onClick={()=>{ submit()}}
                    >
                      next step
                    </Button>

            <Typography sx={{color:"red", fontSize: "12px", marginY:"12px"}}>
                  {error}
                </Typography>       
        </Stack>
    );
}
