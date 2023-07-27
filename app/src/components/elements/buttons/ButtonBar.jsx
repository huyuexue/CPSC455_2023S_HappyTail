import React from 'react';
import {Grid,} from "@mui/material";
import InterestButton from "../InterestButton";
import {faCat, faDog,} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default function ButtonBar() {
    const buttons = [
        {icon: faCat, label: "Cats", link: "/browse?type=cat"},
        {icon: faDog, label: "Dogs", link: "/browse?type=dog"},
    ]

    return (
        <Grid container spacing={2} sx={{
            padding: 2,
            height: 1
        }}>
            {buttons.map((button) =>
                <Grid item key={button.label}>
                    <Link to={button.link} style={{textDecoration: 'none'}}>
                        <InterestButton icon={button.icon} label={button.label}></InterestButton>
                    </Link>
                </Grid>
            )}
        </Grid>
    )
}