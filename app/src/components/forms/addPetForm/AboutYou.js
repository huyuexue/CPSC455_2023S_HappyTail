import {Divider, Grid, Stack, TextField} from "@mui/material";

export default function AboutYou({formData, handleChange}) {
    return (
        <div className="from">
            <h2>About You</h2>
            <Grid container spacing={4} sx={{padding: 10}}>
                <Grid item xs={3}>
                    <Stack spacing={2}>
                        <TextField id="outlined-basic" label="Email" value={formData.email} variant="outlined" onChange={handleChange}/>
                        <TextField id="outlined-basic" label="First Name" value={formData.firstName} variant="outlined" onChange={handleChange}/>
                        <TextField id="outlined-basic" label="Last Name" value={formData.lastName} variant="outlined" onChange={handleChange}/>
                        <TextField id="outlined-basic" label="Phone Number" value={formData.phoneNumber}variant="outlined" onChange={handleChange}/>
                    </Stack>
                </Grid>
                <Grid item xs={0}>
                    <Divider orientation="vertical"/>
                </Grid>
                <Grid item xs={8}>
                    <Stack spacing={2}>
                        <TextField id="outlined-basic" label="Postal Code" value={formData.postalCode}
                                   variant="outlined"
                                   onChange={handleChange}/>
                        <TextField id="outlined-basic" label="City" value={formData.city}
                                   variant="outlined" onChange={handleChange}/>
                        <TextField id="outlined-basic" label="Province" value={formData.province}
                                   variant="outlined" onChange={handleChange}/>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    )
}