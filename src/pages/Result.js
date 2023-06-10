import {SelectPetProperties, SelectSortings} from "../components/results/ComponentsPopulation";
import PetCard from "../components/results/PetResults";


export default function ResultPage() {
    return (
        <div>
            <h2>Pet Filters</h2>
            <SelectPetProperties></SelectPetProperties>
            <h2>Sorting</h2>
            <SelectSortings></SelectSortings>
            <h2>Results</h2>
            <PetCard></PetCard>

            
            
        </div>
    )
}