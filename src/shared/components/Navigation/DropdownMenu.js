import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "react-router-dom";
import { Fade } from "@material-ui/core";

const DropdownMenu =(props) =>{
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                {props.buttonName}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                
            >
                {props.links.map(link => (
                    <MenuItem key={link.link} onClick={handleClose} component={Link} to={link.link}>
                        {link.linkName}
                    </MenuItem>
                ))}

            </Menu>
        </div>
    );
}
export default DropdownMenu;
