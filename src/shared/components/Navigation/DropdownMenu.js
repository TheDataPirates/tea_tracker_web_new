import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {NavLink} from "react-router-dom";

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
                REPORTS
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {props.links.map(link => (
                    <MenuItem key={link.link} onClick={handleClose} >
                        <NavLink to={link.link} exact>{link.linkName}</NavLink>
                    </MenuItem>
                ))}

            </Menu>
        </div>
    );
}
export default DropdownMenu;
