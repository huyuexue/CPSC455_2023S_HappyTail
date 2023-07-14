import {Divider, Grid, Stack, TextField} from "@mui/material";
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function AboutYou({formData, handleChange}) {
    return (
        <div className="from">
            <h2>About You</h2>
            <Grid container spacing={4} sx={{padding: 10}}>
                <Grid item xs={3}>
                    <Stack spacing={2}>
                        <TextField id="outlined-basic" label="Email" variant="outlined"/>
                        <TextField id="outlined-basic" label="First Name" variant="outlined"/>
                        <TextField id="outlined-basic" label="Last Name" variant="outlined"/>
                        <TextField id="outlined-basic" label="Phone Number" variant="outlined"/>
                    </Stack>
                </Grid>
                <Grid item xs={0}>
                    <Divider orientation="vertical"/>
                </Grid>
                <Grid item xs={8}>
                    <Map
                        initialViewState={{
                            longitude: -122.4,
                            latitude: 37.8,
                            zoom: 14
                        }}
                        style={{width: 1, height: 1}}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                    />
                </Grid>
            </Grid>
        </div>
    )
}