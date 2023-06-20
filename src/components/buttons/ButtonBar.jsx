import React from 'react';
import MuiButton from './MuiButton';
import PostCodeSearchBar from '../forms/PostCodeSearchBar';
import { Stack, Box } from "@mui/material";

export default function ButtonBar() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Stack spacing = {4}>
                <PostCodeSearchBar> </PostCodeSearchBar>
                <Stack spacing = {3} direction = 'row'>
                    <MuiButton variant="text" color="primary" link='/result' imageSrc='https://iheartcraftythings.com/wp-content/uploads/2021/11/6-81.jpg'>
                        Cats
                    </MuiButton>
                    <MuiButton variant="text" color="primary" link='/result' imageSrc='https://cdn.pixabay.com/photo/2020/02/12/05/05/dog-cartoon-4841690_1280.jpg'>
                        Dogs
                    </MuiButton>
                </Stack>
            </Stack>
        </Box>
    )
}