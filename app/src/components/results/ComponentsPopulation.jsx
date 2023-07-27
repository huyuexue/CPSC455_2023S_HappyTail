import { PetPropertySelections } from "./FilterSelection";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ageItems, breedItems, coatlengthItems, genderItems, sizeItems, speciesItems} from "../forms/options";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {updateSpecies} from "../../redux/pets/reducer";

export function SelectPetProperties({ onApplyFilters }) {
    // filter properties get inspired by https://www.petfinder.com/search/dogs-for-adoption/ca/british-columbia/vancouver/
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSpecies = queryParams.get('type') || '';
    const [species, setSpecies] = React.useState(initialSpecies);
    // update global store based on specie
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateSpecies(initialSpecies));
    }, []); // Empty dependency array means this effect runs once on mount

    const [age, setAge] = React.useState("");
    const [breed, setBreed] = React.useState("");
    const [size, setSize] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [coatlength, setCoatlength] = React.useState("");

    const handleSpeciesChange = (event) => {
        setSpecies(event.target.value);
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value);
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

    const handleApplyFilters = async () => {
        const filters = {
            age,
            breed,
            size,
            gender,
            coatlength
        };
        const response = await fetch('/pets', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters)
        });
        const result = await response.json();
        onApplyFilters(result);
    };


    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <PetPropertySelections
                label="Species"
                value={species}
                items={speciesItems}
                onChange={handleSpeciesChange}
            />
            <PetPropertySelections
                label="Age"
                value={age}
                items={ageItems}
                onChange={handleAgeChange}
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
            <Button variant="contained" onClick={handleApplyFilters}>Apply Filters</Button>
        </Box>
    );
}
