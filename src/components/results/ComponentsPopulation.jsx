import { PetPropertySelections } from "./FilterSelection";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export function SelectPetProperties() {
    const [age, setSorting] = React.useState("");
    const [breed, setBreed] = React.useState("");

    const handleSortingChange = (event) => {
        setSorting(event.target.value);
    };

    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    };

    const ageItems = [
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
            items={ageItems}
            onChange={handleSortingChange}
        />
        <PetPropertySelections
            label="Breed"
            value={breed}
            items={breedItems}
            onChange={handleBreedChange}
        />
        <Button variant="contained">Apply</Button>
        </Box>
    );
}
