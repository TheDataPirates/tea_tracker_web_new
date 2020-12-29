import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const handleClick = (event) =>{
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const MenuItems = () => {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={handleClick}>
                Material-UI
            </Link>
            <Link color="inherit" onClick={handleClick}>
                Core
            </Link>
            <Typography color="textPrimary">Breadcrumb</Typography>
        </Breadcrumbs>
    );
}
export default MenuItems;