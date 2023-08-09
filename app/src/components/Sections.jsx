import {Paper, styled} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

const vertMargins = 90;
export const Sections = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    marginTop: vertMargins,
    marginBottom: vertMargins,
    padding: 80,
}));

export const SectionButtons = styled(Button)(({theme}) => ({
    width: "25vw",
    fontSize: "1rem",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.paper,
    borderRadius: 25,
    padding: 15,
}));