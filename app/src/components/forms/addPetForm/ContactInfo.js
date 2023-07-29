import {Grid} from "@mui/material";

export default function ContactInfo({formData, handleChange}) {
    return (
        <Grid container spacing={0} paddingTop={5}>
            <Grid item xs={0} sm={0.5}>
            </Grid>
            <Grid item xs={12} sm={3.41}>
                <label>Name:<br/>
                    <input type="text" name="contactName" value={formData.contactName}
                           onChange={handleChange}
                    /><br/>
                </label> <br/>
                <label>Email:<br/>
                    <input type="text" name="contactEmail" value={formData.contactEmail}
                           onChange={handleChange}
                    /><br/>
                </label> <br/>
                <label>Phone Number:<br/>
                    <input type="text" name="contactNumber" value={formData.contactNumber}
                           onChange={handleChange}
                    /><br/>
                </label> <br/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <label>Additional Information:<br/>
                    <textarea type="text" name="description"/>
                </label>
            </Grid>
        </Grid>
    )
}