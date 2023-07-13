import React, {useRef, useState} from "react";

export default function PetInfo({formData, handleChange, onPhotoChanged, onPostcodeFocus }){
    const [houseTrained, setHouseTrained] = useState(formData.houseTrained);
    const handleHouseTrainedChange = (e) => {
        const value = e.target.value;
        setHouseTrained(value);
        handleChange("setHouseTrained", {houseTrained: value});
    };

    const [personalities, setPersonalities] = useState(formData.petPersonality);

    const handlePersonalityChange = (option) => {
        setPersonalities((prevPersonalities) => {
            if (prevPersonalities.includes(option)) {
                return prevPersonalities.filter((item) => item !== option);
            } else {
                return [...prevPersonalities, option];
            }
        });

        handleChange("setPetPersonality", {
            petPersonality: personalities.includes(option)
                ? personalities.filter((item) => item !== option)
                : [...personalities, option],
        });
    };

    const isChecked = (option) => {
        return personalities.includes(option);
    };

    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState(formData.pictureName);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFileName(file.name);
            onPhotoChanged(event, file.name);
        } else {
            setSelectedFileName(null);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };
    return (
        <div className="from">
            <h2>Pet Information</h2>
            <label >Pet Name:
                <input type="text" name = "petName" value = {formData.petName}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
            <label >
                <div className="custom-file-input">
                    Photo:
                    {/*<input
                        ref={fileInputRef}
                        type="file"
                        name="photo"
                        onChange={handleFileInputChange}
                    />
                    <button onClick={handleBrowseClick}>Browse</button>
                    {selectedFileName && <span>{selectedFileName}</span>}*/}
                    <input type="text" name = "picture" value = {formData.picture}
                           onChange = {handleChange}
                    /><br/>

                </div>
            </label> <br/>
            <label >Breed:
                <input type="text" name = "breed" value = {formData.breed}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
            <label >Gender:
                <select name="gender" value = {formData.gender} onChange = {handleChange}>
                    <option value = ''>-Please select-</option>
                    <option value = "female">Female</option>
                    <option value = "male">Male</option>
                </select><br/>
            </label> <br/>
            <label >Age:
                <input type="number" name = "ageYear" value = {formData.ageYear}
                       onChange = {handleChange}
                /> Year
                <input type="number" name = "ageMonth" value = {formData.ageMonth}
                       onChange = {handleChange}
                /> Month
            </label> <br/><br/>
            <label >Size:
                <select name="size" value = {formData.size} onChange = {handleChange}>
                    <option value = ''>-Please select-</option>
                    <option value = "small">Small</option>
                    <option value = "medium">Medium</option>
                    <option value = "large">Large</option>
                    <option value = "xl">Extra Large</option>
                </select><br/>
            </label> <br/>
            <label >Fur Type:
                <select name="furType" value = {formData.furType} onChange = {handleChange}>
                    <option value = ''>-Please select-</option>
                    <option value = "hairless">Hairless</option>
                    <option value = "short">Short</option>
                    <option value = "medium">Medium</option>
                    <option value = "long">Long</option>
                </select><br/>
            </label> <br/>
            <label >House Trained:
                <input type="radio" value="yes" checked={houseTrained === "yes"} onChange={handleHouseTrainedChange}/>Yes
                <input type="radio" value="no" checked={houseTrained === "no"} onChange={handleHouseTrainedChange}/>No
            </label> <br/><br/>

            <label >Location:
                <input type="text" name = "postcode" value = {formData.postcode}
                       onChange = {handleChange}
                       onFocus = {onPostcodeFocus}
                /><br/>
            </label> <br/>


            <div className="pet-personality-container">
                <label>Pet Personality:</label>
                <div className="selected-options-box">
                    <div className="options-container">
                        {personalities.map((option) => (
                            <div key={option} className="option">
                                <span className="option-label">{option.toUpperCase()}</span>{" "}
                                <button
                                    className="remove-button"
                                    onClick={() => handlePersonalityChange(option)}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        value="child friendly"
                        checked={isChecked("child friendly")}
                        onChange={() => handlePersonalityChange("child friendly")}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className="checkbox-label">Child Friendly</span>
                    <input
                        type="checkbox"
                        value="pet friendly"
                        checked={isChecked("pet friendly")}
                        onChange={() => handlePersonalityChange("pet friendly")}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className="checkbox-label">Pet Friendly</span>
                    <input
                        type="checkbox"
                        value="playful"
                        checked={isChecked("playful")}
                        onChange={() => handlePersonalityChange("playful")}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className="checkbox-label">Playful</span>
                    <input
                        type="checkbox"
                        value="energetic"
                        checked={isChecked("energetic")}
                        onChange={() => handlePersonalityChange("energetic")}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className="checkbox-label">Energetic</span>
                    <input
                        type="checkbox"
                        value="calm"
                        checked={isChecked("calm")}
                        onChange={() => handlePersonalityChange("calm")}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className="checkbox-label">Calm</span>
                    <input
                        type="checkbox"
                        value="quiet"
                        checked={isChecked("quiet")}
                        onChange={() => handlePersonalityChange("quiet")}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className="checkbox-label">Quiet</span>
                </div>
            </div><br/>

            <label >Description:<br/>
                <textarea type="text" name = "description" value = {formData.description}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
        </div>
        )

}