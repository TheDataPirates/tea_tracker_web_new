import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import DropdownMenu from '../Navigation/DropdownMenu';
import './NavLinks.css';

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
            <DropdownMenu links={[{link:"/reports/production",linkName:'Production'},{link:"/reports/purchasing",linkName:'Purchasing'}]}/>
          </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/users" exact>USERS</NavLink>
        </li>
      )}

        {auth.isLoggedIn && (
            <li>
                <NavLink to="/users/new">ADD USERS</NavLink>
            </li>
        )}


      {auth.isLoggedIn && (
          <li>
            <NavLink to="/suppliers" exact>SUPPLIERS</NavLink>
          </li>
      )}
      {auth.isLoggedIn && (
          <li>
            <NavLink to="/suppliers/new">ADD SUPPLIERS</NavLink>
          </li>
      )}
      {auth.isLoggedIn && (
          <li>
            <NavLink to="/machines" exact>MACHINES</NavLink>
          </li>
      )}
      {auth.isLoggedIn && (
          <li>
            <NavLink to="/machines/new">ADD MACHINES</NavLink>
          </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
