import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import DropdownMenu from '../Navigation/DropdownMenu';
import './NavLinks.css';
import DropdownLogout from "./DropdownLogout";

const NavLinks = props => {
  const auth = useContext(AuthContext);


  return (
    <ul className="nav-links">
        {auth.isLoggedIn &&(
            <li>
                <NavLink to="/" exact>
                    DASHBOARD
                </NavLink>
            </li>
        )}
      {auth.isLoggedIn && (
          <li>
            <DropdownMenu links={[{link:"/reports/production",linkName:'Production'},{link:"/reports/purchasing",linkName:'Purchasing'}]} buttonName="Production"/>
          </li>
      )}
      {auth.isLoggedIn && (
        <li>
          {/* <NavLink to="/users" exact>USERS</NavLink> */}
          <DropdownMenu links={[{link:"/users",linkName:'View Users'},{link:"/users/new",linkName:'Add Users'}]} buttonName="Users"/>
        </li>
      )}
{/* 
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/users/new">ADD USERS</NavLink>
            </li>
        )} */}


      {auth.isLoggedIn && (
          <li>
            {/* <NavLink to="/suppliers" exact>SUPPLIERS</NavLink> */}
            <DropdownMenu links={[{link:"/suppliers",linkName:'View Suppliers'},{link:"/suppliers/new",linkName:'Add Suppliers'}]} buttonName="Suppliers"/>
          </li>
      )}
      {/* {auth.isLoggedIn && (
          <li>
            <NavLink to="/suppliers/new">ADD SUPPLIERS</NavLink>
          </li>
      )} */}
      {auth.isLoggedIn && (
          <li>
            {/* <NavLink to="/machines" exact>MACHINES</NavLink> */}
            <DropdownMenu links={[{link:"/machines",linkName:'View Machines'},{link:"/machines/new",linkName:'Add Machines'}]} buttonName="Machines"/>
          </li>
      )}
      {/* {auth.isLoggedIn && (
          <li>
            <NavLink to="/machines/new">ADD MACHINES</NavLink>
          </li>
      )} */}
      {auth.isLoggedIn && (
        <li>
          {/*<button onClick={auth.logout}>LOGOUT</button>*/}
          <DropdownLogout/>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
