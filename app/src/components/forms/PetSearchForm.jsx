import {Search, SearchIconWrapper, StyledInputBase} from "../elements/Search";
import SearchIcon from '@mui/icons-material/Search';

export default function PetSearchForm(){
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
}