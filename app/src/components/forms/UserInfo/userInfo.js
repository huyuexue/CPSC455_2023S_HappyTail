import * as React from "react";
import {Input, Stack, TextField,Button} from "@mui/material";
import {useState} from "react";


export default function UserInfo({setNextStep}) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [number, setNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

    const submit=()=>{
        setNextStep(2)
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
                      onClick={()=>{console.log(lastName)}}
                    >
                      next step
                    </Button>
        </Stack>
    );
}
