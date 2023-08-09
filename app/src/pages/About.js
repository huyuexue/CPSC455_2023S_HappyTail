
import '../style/index.css';
import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Stack,
} from "@mui/material";


export default function About() {
    return (
        <Grid container spacing={0} paddingTop={5} direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={4}>
                <Card sx={{
                    maxWidth: "35vw",
                    borderRadius: 5,
                    padding: 7,
                    paddingTop: 0,
                    paddingBottom: 0,
                    maxHeight: "80vh",
                    overflow: 'auto'
                }} elevation={8}>
                    <h1>About Us</h1>
                    <CardMedia
                        component="img"
                        height="400"
                        image='https://www.thesprucepets.com/thmb/AUhVkJo7GEsadFm4jevINielAuQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/black-lab-names-5093386-hero-5d14645833114fda9f7e3e620e5e4d67.jpg'
                        sx={{borderRadius: 10}}
                    />
                    <CardContent>

                        <Stack sx={{}}>
                            <p> Developed by Tina Hu, Ayan Das, Richard Wang, James Ross and Ethan Nguyen<br/>
                            </p>
                            <p>
                                Developed for CPSC 445 in 2023
                            </p>
                            <p> Contact Us:<br/>
                                contact@happytails.tech
                            </p>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    );
}