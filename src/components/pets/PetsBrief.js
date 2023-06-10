import {useDispatch, useSelector} from "react-redux";
import React, { useState } from 'react';
import {petsState} from "./petsSlice";
import PetCard from "./PetCard";
import '../../style/PetsBrief.css';


export default function PetsBrief() {
    const petsCurState = useSelector(petsState);
    const pets = petsCurState.list;

    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % pets.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + pets.length) % pets.length);
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % pets.length);
        }, 6000); // Adjust the interval duration as needed
    
        return () => {
          clearInterval(interval);
        };
      }, [pets.length]);

    return (
        <div className = 'main-slide'>
        <h2>Pets Looking for A Forever Home</h2>
        <div className="slideshow-container">
            <button className="prev-btn" onClick={handlePrev}>
            Previous
            </button>
            <button className="next-btn" onClick={handleNext}>
            Next
            </button>
            <div className="slideshow">
            {pets.map((pet, index) => (
                <div
                className={`slide ${index === activeIndex ? 'active' : ''}`}
                key={pet.id}
                >
                {index === activeIndex && <PetCard pet={pet} />}
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}