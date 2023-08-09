import ImageUpload from "../imageUpload/upload";
import React, {useState} from "react";
import {Grid} from "@mui/material";

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
        <Grid container spacing={0} paddingTop={5} style={{ border: "1px solid black", marginTop: '30px', marginBottom: '20px', paddingLeft: 100, borderRadius: '25px', borderColor: '#597133'}}>
            <Grid item xs={12} sm={6} >
                <>
                    {update ? "" :
                        <>
                            <span className="required-field" />
                            <label style={{fontWeight: 'bold', fontSize: '16px'}}>I am looking for a home for a&nbsp;

                                <select name="species" value={formData.species} onChange={onSpeciesChanged} style={{borderRadius: '10px', borderColor: '#597133', fontSize: '16px'}}>
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
                    <span className="required-field" style={{fontWeight: 'bold', fontSize: '16px'}}> Photo</span>
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
                <label style={{fontWeight: 'bold', fontSize: '16px'}}>Pet Name&nbsp;
                    <input type="text" name="petName" value={formData.petName} style={{borderRadius: '10px', fontSize: '16px', height: '30px'}}
                        onChange={handleChange}
                    /><br/>
                </label> <br/>
                <span className="required-field" />
                <label style={{fontWeight: 'bold', fontSize: '16px'}}>Breed &nbsp;
                    <input type="text" name="breed" value={formData.breed}
                        onChange={handleChange} style={{borderRadius: '10px', fontSize: '16px', height: '30px'}}
                    /><br/>
                </label> <br/>
                <span className="required-field" />
                <label style={{fontWeight: 'bold', fontSize: '16px'}}>Gender &nbsp;
                    <select name="gender" value={formData.gender} onChange={handleChange} style={{borderRadius: '10px', fontSize: '16px', height: '30px'}}>
                        <option value=''>-Please select-</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select><br/>
                </label> <br/>
                <span className="required-field" />
                <label style={{fontWeight: 'bold', fontSize: '16px'}}>Age &nbsp;
                    <input type="number" name="ageYear" value={formData.ageYear} style={{borderRadius: '10px', fontSize: '16px', height: '30px'}} min={0}
                        onChange={handleChange}
                    /> Year &nbsp;
                    <input type="number" name="ageMonth" value={formData.ageMonth} min={0} max={12} style={{borderRadius: '10px', fontSize: '16px', height: '30px'}}
                        onChange={handleChange}
                    /> Month 
                </label> <br/><br/>
                <span className="required-field" />
                <label style={{fontWeight: 'bold', fontSize: '16px'}}>Size &nbsp;
                    <select name="size" value={formData.size} onChange={handleChange} style={{borderRadius: '10px', fontSize: '16px', height: '30px'}}>
                        <option value=''>-Please select-</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="xl">Extra Large</option>
                    </select><br/>
                </label> <br/>
                <span className="required-field" />
                <label style={{fontWeight: 'bold', fontSize: '16px'}}>Altered &nbsp;
                    <select name="spayed" value={formData.spayed} onChange={handleChange} style={{borderRadius: '10px', fontSize: '16px', height: '30px'}}>
                        <option value=''>-Please select-</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="not_sure">Not Sure</option>
                    </select><br/>
                </label><br/>
                <span className="required-field" />
                <label style={{fontWeight: 'bold', fontSize: '16px'}}>House Trained &nbsp;
                    <input type="radio" value="yes" checked={houseTrained === "yes"}
                        onChange={handleHouseTrainedChange}/>Yes
                    <input type="radio" value="no" checked={houseTrained === "no"}
                        onChange={handleHouseTrainedChange}/>No
                </label> <br/><br/>
            </Grid>
            <span className="required-field" style={{ fontStyle: 'italic', fontSize: '16px', color: 'grey' }}> Requires Fields.</span>
        </Grid>

    )
}