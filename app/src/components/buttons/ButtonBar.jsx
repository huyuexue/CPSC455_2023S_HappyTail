import React from 'react';
import MuiButton from './MuiButton';
import PostCodeSearchBar from '../forms/PostCodeSearchBar';
import { Stack, Box } from "@mui/material";
import RehomeButton from "../RehomeButton";

export default function ButtonBar() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Stack spacing = {4}>
                <PostCodeSearchBar> </PostCodeSearchBar>
                <Stack spacing = {3} direction = 'row'>
                    <MuiButton variant="text" color="primary" link='/browse' imageSrc='https://iheartcraftythings.com/wp-content/uploads/2021/11/6-81.jpg'>
                        Cats
                    </MuiButton>
                    <MuiButton variant="text" color="primary" link='/browse' imageSrc='https://cdn.pixabay.com/photo/2020/02/12/05/05/dog-cartoon-4841690_1280.jpg'>
                        Dogs
                    </MuiButton>
                    <div className="vl"></div>
                    <MuiButton  variant="text" color="primary" link='/addNewPet' imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvNrnjrIw6at92tYPeoB3Fn_fUj6PNniE_3w&usqp=CAU">
                    </MuiButton>

                </Stack>
            </Stack>
        </Box>
    )
}