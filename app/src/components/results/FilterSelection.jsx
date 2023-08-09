import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {Input} from "@mui/material";


export function PetPropertySelections(props) {
    const { label, value, items, onChange } = props;

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            {!items ? (
                <Input
                    id={`input-${label}`}
                    value={value}
                    onChange={handleChange}
                    inputProps={{
                        'aria-label': label,
                    }}
                    sx={{ borderRadius: '20px' }} // added border radius
                />
            ) : (
                <Select
                    labelId={`input-${label}`}
                    id={`input-${label}`}
                    value={value}
                    label={label}
                    onChange={handleChange}
                    sx={{ borderRadius: '20px' }} // added border radius
                >
                    {items.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            )}
        </FormControl>
        </Box>
    );
}
