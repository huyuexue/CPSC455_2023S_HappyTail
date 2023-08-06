import ImageUpload from "../imageUpload/upload";
import React, {useState} from "react";
import {Grid} from "@mui/material";
import {PetPropertySelections} from "../results/FilterSelection";
import {ageItems, furTypeItems, genderItems, sizeItems} from "../results/options";

export default function BasicInfo({formData, handleChange, update}) {

    const onSpeciesChanged = (e) => {
        handleChange(e);
    }
    const [houseTrained, setHouseTrained] = useState(formData.houseTrained);
    const handleHouseTrainedChange = (e) => {
        const value = e.target.value;
        setHouseTrained(value);
        handleChange("setHouseTrained", {houseTrained: value});
    };

    return (
        <Grid container spacing={0} paddingTop={5}>
            <Grid item xs={12} sm={6}>
                <>
                    {update ? "" :
                        <>
                            <span className="required-field" />
                            <label>I am looking for a home for a

                                <select name="species" value={formData.species} onChange={onSpeciesChanged}>
                                    <option value=''>-Please select-</option>
                                    <option value="cat">Cat</option>
                                    <option value="dog">Dog</option>
                                </select>
                            </label>
                        </>
                    }
                </>
                <br/><br/>
                <label>
                    <span className="required-field" /> Photo:
                    {formData.picture !== '' && (
                        <div>
                            <img className="previewPhoto" src={formData.picture}/>
                        </div>
                    )}
                    <ImageUpload handleChange={handleChange}/>
                </label> <br/>

            </Grid>
            <Grid item xs={6}>
                <span className="required-field" />
                <label>Pet Name:
                    <input type="text" name="petName" value={formData.petName}
                           onChange={handleChange}
                    /><br/>
                </label> <br/>
                <span className="required-field" />
                <label>Breed:
                    <input type="text" name="breed" value={formData.breed}
                           onChange={handleChange}
                    /><br/>
                </label> <br/>
                <span className="required-field" />
                <label>Gender:
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value=''>-Please select-</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select><br/>
                </label> <br/>
                <span className="required-field" />
                <label>Age:
                    <input type="number" name="ageYear" value={formData.ageYear} min={0}
                           onChange={handleChange}
                    /> Year
                    <input type="number" name="ageMonth" value={formData.ageMonth} min={0} max={12}
                           onChange={handleChange}
                    /> Month
                </label> <br/><br/>
                <span className="required-field" />
                <label>Size:
                    <select name="size" value={formData.size} onChange={handleChange}>
                        <option value=''>-Please select-</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="xl">Extra Large</option>
                    </select><br/>
                </label> <br/>
                <span className="required-field" />
                <label>Altered:
                    <select name="spayed" value={formData.spayed} onChange={handleChange}>
                        <option value=''>-Please select-</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="not_sure">Not Sure</option>
                    </select><br/>
                </label><br/>
                <span className="required-field" />
                <label>House Trained:
                    <input type="radio" value="yes" checked={houseTrained === "yes"}
                           onChange={handleHouseTrainedChange}/>Yes
                    <input type="radio" value="no" checked={houseTrained === "no"}
                           onChange={handleHouseTrainedChange}/>No
                </label> <br/><br/>
            </Grid>
            <span className="required-field" style={{ fontStyle: 'italic', fontSize: '14px', color: 'grey' }}> Requires Fields.</span>
        </Grid>


    )
}