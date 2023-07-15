import { PetPropertySelections } from "./FilterSelection";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ageItems, breedItems, coatlengthItems, genderItems, sizeItems} from "../forms/options";

export function SelectPetProperties() {
    // filter properties get inspired by https://www.petfinder.com/search/dogs-for-adoption/ca/british-columbia/vancouver/
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <PetPropertySelections
            label="Age"
            value={age}
            items={ageItems}
            onChange={handleSortingChange}
        />
        <PetPropertySelections
            label="Breed"
            value={breed}
            items={breedItems}
            onChange={handleBreedChange}
        />
        <PetPropertySelections
            label="Size"
            value={size}
            items={sizeItems}
            onChange={handleSizeChange}
        />
        <PetPropertySelections
            label="Gender"
            value={gender}
            items={genderItems}
            onChange={handleGenderChange}
        />
        <PetPropertySelections
            label="Coat Length"
            value={coatlength}
            items={coatlengthItems}
            onChange={handleCoatlengthChange}
        />
        <Button variant="contained">Apply Filters</Button>
        </Box>
    );
}
