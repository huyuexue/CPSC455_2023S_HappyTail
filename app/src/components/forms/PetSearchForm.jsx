import {Search, SearchIconWrapper, StyledInputBase} from "../elements/Search";
import SearchIcon from '@mui/icons-material/Search';

export default function PetSearchForm(props){
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={props.placeholder}
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
}

PetSearchForm.defaultProps = {
    placeholder: "Search..."
}