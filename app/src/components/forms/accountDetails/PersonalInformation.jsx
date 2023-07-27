import * as React from "react";
import {Input, Stack, TextField} from "@mui/material";
import {useState} from "react";


export default function PersonalInformationForm() {

    const [searchQuery, setSearchQuery] = useState('');
    const ariaLabel = { 'aria-label': 'description' };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (

        <Stack spacing={4}>
            <TextField
                label="First Name"
                value={searchQuery}
                onChange={handleChange}
                variant="filled"
            />
            <Input defaultValue="Hello world" inputProps={ariaLabel} />
            <TextField
                label="Last Name"
                value={searchQuery}
                onChange={handleChange}
            />
            <TextField
                label="eMail"
                value={searchQuery}
                onChange={handleChange}
            />
            <TextField
                label="Number"
                value={searchQuery}
                onChange={handleChange}
            />
            <TextField
                label="Postal Code"
                value={searchQuery}
                onChange={handleChange}
            />
            <TextField
                label="Address"
                value={searchQuery}
                onChange={handleChange}
            />
            <TextField
                label="City"
                value={searchQuery}
                onChange={handleChange}
            />
        </Stack>
    );
}
