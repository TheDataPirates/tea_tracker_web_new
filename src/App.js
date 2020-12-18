import React, { useState, useCallback } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import Users from './users/pages/Users';
import Dashboard from "./dashboard/pages/Dashboard";
import NewUser from "./users/pages/NewUser";
import UpdateUser from "./users/pages/UpdateUser";
// import NewPlace from './places/pages/NewPlace';
// import UserPlaces from './places/pages/UserPlaces';
// import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './dashboard/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import Suppliers from "./suppliers/pages/Suppliers";
import NewSupplier from "./suppliers/pages/NewSupplier";
import UpdateSupplier from "./suppliers/pages/UpdateSupplier";
import Machines from "./machines/pages/Machines";
import NewMachine from "./machines/pages/NewMachine";
import UpdateMachine from "./machines/pages/UpdateMachine";


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, []);

    let routes;

    if (isLoggedIn) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Dashboard />
                </Route>
                <Route path="/users/new" exact>
                    <NewUser/>
                </Route>
                <Route path="/users" exact>
                    <Users />
                </Route>
                <Route path="/users/:userId" >
                    <UpdateUser />
                </Route>

                <Route path="/suppliers" exact>
                    <Suppliers/>
                </Route>
                <Route path="/suppliers/new" exact>
                    <NewSupplier/>
                </Route>
                <Route path="/suppliers/:suppId">
                    <UpdateSupplier/>
                </Route>

                <Route path="/machines" exact>
                    <Machines/>
                </Route>
                <Route path="/machines/new" exact>
                    <NewMachine/>
                </Route>
                <Route path="/machines/:machId">
                    <UpdateMachine/>
                </Route>
                <Redirect to="/" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>

                <Route path="/auth">
                    <Auth />
                </Route>
                <Redirect to="/auth" />
            </Switch>
        );
    }

    return (
        <AuthContext.Provider
            value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
        >
            <Router>
                <MainNavigation />
                <main>{routes}</main>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
