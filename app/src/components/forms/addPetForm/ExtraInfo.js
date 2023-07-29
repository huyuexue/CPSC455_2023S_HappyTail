import React, {useState} from "react";
import {Grid} from "@mui/material";

export default function ExtraInfo({formData, handleChange, onPostcodeFocus}) {
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

    return (
        <Grid container spacing={0} paddingTop={5}>
            <Grid item xs={12} sm={6}>
                <label>Location:
                    <input type="text" name="postCode" value={formData.postCode} placeholder={"Postal code"}
                           onChange={handleChange}
                           onFocus={onPostcodeFocus}
                    /><br/>
                </label> <br/>
                <label>Fur Type:
                    <select name="furType" value={formData.furType} onChange={handleChange}>
                        <option value=''>-Please select-</option>
                        <option value="hairless">Hairless</option>
                        <option value="short">Short</option>
                        <option value="medium">Medium</option>
                        <option value="long">Long</option>
                    </select><br/>
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
                </div>
                <br/>
            </Grid>
            <Grid item xs={12} sm={6}>

                <label>Description:<br/>
                    <textarea type="text" name="description" value={formData.description}
                              onChange={handleChange}
                    /><br/>
                </label> <br/>

                <label>Reason for rehoming:<br/>
                    <textarea type="text" name="reason"
                              value={formData.reason} onChange={handleChange}/><br/>
                </label><br/>

                <label>Length of ownership:
                    <input type="text" name="length"
                           value={formData.length} onChange={handleChange}/><br/>
                </label><br/>
            </Grid>
        </Grid>

    )

}