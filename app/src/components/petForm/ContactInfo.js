import {Grid} from "@mui/material";
import React from "react";

export default function ContactInfo({formData, handleChange}) {
    return (
        <>
            <Grid container spacing={0} paddingTop={5} style={{ border: "1px solid black", marginTop: '30px', marginBottom: '20px', paddingLeft: 100, borderRadius: '25px', borderColor: '#597133'}}>
                <Grid item xs={0} sm={0.5}>
                </Grid>
                <Grid item xs={12} sm={3.41}>
                    <span className="required-field" />
                    <label style={{fontWeight: 'bold', fontSize: '16px'}}>Name<br/>
                        <input type="text" name="contactName" value={formData.contactName} style={{borderRadius: '10px', fontSize: '16px', height: '30px'}}
                            onChange={handleChange}
                        /><br/>
                    </label> <br/>
                    <span className="required-field" />
                    <label style={{fontWeight: 'bold', fontSize: '16px'}}>Email<br/>
                        <input type="text" name="contactEmail" value={formData.contactEmail} style={{borderRadius: '10px', fontSize: '16px', height: '30px'}}
                            onChange={handleChange}
                        /><br/>
                    </label> <br/>
                    <span className="required-field" />
                    <label style={{fontWeight: 'bold', fontSize: '16px'}}>Phone Number<br/>
                        <input type="text" name="contactNumber" value={formData.contactNumber} style={{borderRadius: '10px', fontSize: '16px', height: '30px'}}
                            onChange={handleChange}
                        /><br/>
                    </label> <br/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <label style={{fontWeight: 'bold', fontSize: '16px'}}>Additional Information:<br/>
                        <textarea type="text" name="description" value={formData.addInfo} style={{borderRadius: '20px', fontSize: '16px'}}
                            onChange={handleChange}/>
                    </label>
                </Grid>
            </Grid>
            <span className="required-field" style={{ fontStyle: 'italic', fontSize: '14px', color: 'grey' }}> Requires Fields.</span>
        </>
        )
}