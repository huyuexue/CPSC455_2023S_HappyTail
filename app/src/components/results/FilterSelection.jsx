import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';


export function PetPropertySelections(props) {
    const { label, value, items, onChange } = props;

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            onChange={handleChange}
            >
            {items.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                {item.label}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </Box>
    );
}
