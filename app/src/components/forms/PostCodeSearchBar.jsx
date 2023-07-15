import React, {useState} from 'react';
import {TextField, Button, Autocomplete, Box, Grid} from "@mui/material";
import {Link} from 'react-router-dom';
import '../../style/button.css';

export default function PostCodeSearchBar() {
    const [searchQuery, setSearchQuery] = useState('');


    const handleSearch = () => {
        // Perform search logic here

        // Navigate to another page with the search value as a query parameter

    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <div className='search-bar-container'>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={5} sm={6} md={7}>
                        <TextField
                            label="Postal Code"
                            value={searchQuery}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3} sm={2} md={1}>
                        <Link to={`/result?query=${searchQuery}`}>
                            <Button onClick={handleSearch} variant="contained" color="primary">
                                Search
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Box>
    )
}