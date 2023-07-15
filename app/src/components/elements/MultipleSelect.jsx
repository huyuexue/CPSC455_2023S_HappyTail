import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {useState} from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(testItem, item, theme) {
    return {
        fontWeight:
            item.indexOf(testItem) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect(props) {
    const theme = useTheme();
    const [currentItem, setCurrentItem] = useState([]);

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setCurrentItem(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl>
            <InputLabel id="demo-multiple-chip-label">{props.name}</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={currentItem}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                renderValue={(selected) => (
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map((value) => (
                            <Chip key={value} label={value}/>
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {props.items.map((item) => (
                    <MenuItem
                        key={item.value}
                        value={item.label}
                        style={getStyles(item.value, currentItem, theme)}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}