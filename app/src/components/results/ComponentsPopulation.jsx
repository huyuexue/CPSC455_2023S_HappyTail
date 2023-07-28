import { PetPropertySelections } from "./FilterSelection";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ageItems, breedItems, furTypeItems, genderItems, sizeItems} from "../forms/options";
import {useDispatch, useSelector} from "react-redux";
import {getSearchResultsAsync} from "../../redux/pets/thunks";


export function SelectPetProperties({ onApplyFilters }) {
    // filter properties get inspired by https://www.petfinder.com/search/dogs-for-adoption/ca/british-columbia/vancouver/
    const [age, setAge] = React.useState("");
    const [breed, setBreed] = React.useState("");
    const [size, setSize] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [furType, setFurType] = React.useState("");

    const dispatch = useDispatch();
    const handleAgeChange = (event) => {;
        setAge(event);
    };

    const handleBreedChange = (event) => {
        setBreed(event);
    };

    const handleSizeChange = (event) => {
        setSize(event);
    };

    const handleGenderChange = (event) => {
        setGender(event);
    };

    const handleFurTypeChange = (event) => {
        setFurType(event);
    };

    const handleApplyFilters = async () => {
        const filters = {
            age,
            breed,
            size,
            gender,
            furType,
        };
        const filteredFilters = {};
        for (const key in filters) {
            if (filters[key] !== '') {
                filteredFilters[key] = filters[key];
            } else {
                filteredFilters[key] = 'any';
            }
        }
        const filterString = Object.entries(filteredFilters)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        dispatch(getSearchResultsAsync({searchTerm: filterString}));
    };


    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <PetPropertySelections
                label="Age"
                value={age}
                items={ageItems}
                onChange={handleAgeChange}
            />
            <PetPropertySelections
                label="Breed"
                value={breed}
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
                label="Fur Type"
                value={furType}
                items={furTypeItems}
                onChange={handleFurTypeChange}
            />
            <Button variant="contained" onClick={handleApplyFilters}>Apply Filters</Button>
        </Box>
    );
}
