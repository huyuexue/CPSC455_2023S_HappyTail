// https://mui.com/material-ui/react-button/#complex-button

import {ButtonBase, styled} from "@mui/material";

export const LargeIconButton = styled(ButtonBase)(({theme}) => ({
    position: 'relative',
    height: 200,
    width: 200,
    color: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
        width: 100,
        height: 100,
    },
    borderRadius: 15,

    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));