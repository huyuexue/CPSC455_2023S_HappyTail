import * as React from "react";
import Box from "@mui/material/Box";
import {ageItems, breedItems, coatlengthItems, genderItems, sizeItems, personalityItems} from "../options";
import MultipleSelect from "../../elements/MultipleSelect";

export default function PetPreferencesForm() {
    const [age, setSorting] = React.useState("");
    const [breed, setBreed] = React.useState("");
    const [size, setSize] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [coatlength, setCoatlength] = React.useState("");


    const handleSortingChange = (event) => {
        setSorting(event.target.value);
    };

    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleCoatlengthChange = (event) => {
        setCoatlength(event.target.value);
    };


    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <MultipleSelect name="Age" items={ageItems}/>
            <MultipleSelect name="Breed" items={breedItems}/>
            <MultipleSelect name="Size" items={sizeItems}/>
            <MultipleSelect name="Gender" items={genderItems}/>
            <MultipleSelect name="Coat Length" items={coatlengthItems}/>
            <MultipleSelect name="Personality" items={personalityItems}/>
        </Box>
    );
}