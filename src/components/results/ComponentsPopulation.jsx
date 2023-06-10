import { PetPropertySelections, SortingSelections } from "./Selections";
import * as React from "react";
import Box from "@mui/material/Box";

export function SelectPetProperties() {
    const [age, setSorting] = React.useState("");
    const [breed, setBreed] = React.useState("");

    const handleSortingChange = (event) => {
        setSorting(event.target.value);
    };

    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    };

    const sortings = [
        { label: "Puppy", value: "puppy" },
        { label: "Young", value: "young" },
        { label: "Adult", value: "adult" },
        { label: "Senior", value: "senior" },
    ];

    const breedItems = [
        { label: "Labrador Retriever", value: "labrador" },
        { label: "Golden Retriever", value: "golden" },
        { label: "German Shepherd", value: "german-shepherd" },
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <PetPropertySelections
            label="Age"
            value={age}
            items={sortings}
            onChange={handleSortingChange}
        />
        <PetPropertySelections
            label="Breed"
            value={breed}
            items={breedItems}
            onChange={handleBreedChange}
        />
        </Box>
    );
    }

    export function SelectSortings() {
    const [sorting, setSorting] = React.useState("");

    const handleSortingChange = (event) => {
        setSorting(event.target.value);
    };

    const sortings = [
        { label: "Best match", value: "BestMatch" },
        { label: "Newest addition", value: "NewestAddition" },
        { label: "Oldest addition", value: "OldestAddition" },
        { label: "Most urgent", value: "MostUrgent" },
        { label: "Nearest", value: "Nearest" },
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <SortingSelections
            label="Sort By"
            value={sorting}
            items={sortings}
            onChange={handleSortingChange}
        />
        </Box>
    );
}
