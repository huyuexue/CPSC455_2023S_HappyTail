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
        <Grid container spacing={0} paddingTop={5} style={{ border: "1px solid black", marginTop: '30px', marginBottom: '20px', paddingLeft: 100, borderRadius: '25px', borderColor: '#597133'}}>
            <Grid item xs={12} sm={6}>
                <span className="required-field" />
                <label style={{fontWeight: 'bold', fontSize: '16px'}}>Location &nbsp;
                    <input type="text" name="postCode" value={formData.postCode} placeholder={"Postal code"} style={{borderRadius: '10px', fontSize: '16px', height: '30px'}}
                        onChange={handleChange}
                        onFocus={onPostcodeFocus}
                    /><br/>
                </label> <br/>
                <span className="required-field" />
                <label style={{fontWeight: 'bold', fontSize: '16px'}}>Fur Type &nbsp;
                    <select name="furType" value={formData.furType} onChange={handleChange} style={{borderRadius: '10px', fontSize: '16px', height: '30px'}}>
                        <option value=''>-Please select-</option>
                        <option value="hairless">Hairless</option>
                        <option value="short">Short</option>
                        <option value="medium">Medium</option>
                        <option value="long">Long</option>
                    </select><br/>
                </label> <br/>
                <div className="pet-personality-container">
                    <label style={{fontWeight: 'bold', fontSize: '16px'}}>Pet Personality</label>
                    <div className="selected-options-box" style={{borderRadius: '10px', fontSize: '16px', height: '30px'}}>
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
                <br/>
                <div>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            value="child friendly"
                            checked={isChecked("child friendly")}
                            onChange={() => handlePersonalityChange("child friendly")}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className="checkbox-label" style={{fontWeight: 'bold', fontSize: '14px'}}>Child Friendly</span> &nbsp;
                        <input
                            type="checkbox"
                            value="pet friendly"
                            checked={isChecked("pet friendly")}
                            onChange={() => handlePersonalityChange("pet friendly")}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className="checkbox-label" style={{fontWeight: 'bold', fontSize: '14px'}}>Pet Friendly</span> &nbsp;
                        <input
                            type="checkbox"
                            value="playful"
                            checked={isChecked("playful")}
                            onChange={() => handlePersonalityChange("playful")}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className="checkbox-label" style={{fontWeight: 'bold', fontSize: '14px'}}>Playful</span> &nbsp;
                        <input
                            type="checkbox"
                            value="energetic"
                            checked={isChecked("energetic")}
                            onChange={() => handlePersonalityChange("energetic")}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className="checkbox-label" style={{fontWeight: 'bold', fontSize: '14px'}}>Energetic</span> &nbsp; <br/>
                        <input
                            type="checkbox"
                            value="calm"
                            checked={isChecked("calm")}
                            onChange={() => handlePersonalityChange("calm")}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className="checkbox-label" style={{fontWeight: 'bold', fontSize: '14px'}}>Calm</span> &nbsp;
                        <input
                            type="checkbox"
                            value="quiet"
                            checked={isChecked("quiet")}
                            onChange={() => handlePersonalityChange("quiet")}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className="checkbox-label" style={{fontWeight: 'bold', fontSize: '14px'}}>Quiet</span>
                    </div>
                </div>
                <br/>
            </Grid>
            <Grid item xs={12} sm={6}>

                <label style={{fontWeight: 'bold', fontSize: '16px'}}>Description:<br/>
                    <textarea type="text" name="description" value={formData.description}
                        onChange={handleChange} 
                        style={{borderRadius: '20px', fontSize: '16px', height: '30px'}}
                    /><br/>
                </label> <br/>

                <label style={{fontWeight: 'bold', fontSize: '16px'}}>Reason for rehoming:<br/>
                    <textarea type="text" name="reason"
                        value={formData.reason} onChange={handleChange}
                        style={{borderRadius: '20px', fontSize: '16px', height: '30px'}}/><br/>
                </label><br/>

                <label style={{fontWeight: 'bold', fontSize: '16px'}}>Length of ownership<br/>
                    <input type="text" name="length"
                        value={formData.length} onChange={handleChange}
                        style={{borderRadius: '10px', fontSize: '16px', height: '30px'}}/><br/>
                </label><br/>
            </Grid>
            <span className="required-field" style={{ fontStyle: 'italic', fontSize: '14px', color: 'grey' }}> Requires Fields.</span>
        </Grid>

    )

}