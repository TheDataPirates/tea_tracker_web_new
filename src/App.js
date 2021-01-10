import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from "./shared/util/theme";
import Users from './users/pages/Users';
import Dashboard from "./dashboard/pages/Dashboard";
import NewUser from "./users/pages/NewUser";
import UpdateUser from "./users/pages/UpdateUser";
import Reports from "./reports/pages/reports";
import Auth from './dashboard/pages/Auth';
import AuthNew from "./dashboard/pages/AuthNew";
import MainNavigation from './shared/components/Navigation/MainNavigation';
import {AuthContext} from './shared/context/auth-context';
import {useAuth} from "./shared/hooks/auth-hook";
import Suppliers from "./suppliers/pages/Suppliers";
import NewSupplier from "./suppliers/pages/NewSupplier";
import UpdateSupplier from "./suppliers/pages/UpdateSupplier";
import Machines from "./machines/pages/Machines";
import NewMachine from "./machines/pages/NewMachine";
import UpdateMachine from "./machines/pages/UpdateMachine";
import Purchasing from "./reports/pages/Purchasing";

const App = () => {
    const {token, login, logout, userId} = useAuth();


    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Dashboard/>
                </Route>
                <Route path="/reports/production" exact>
                    <Reports/>
                </Route>
                <Route path="/reports/purchasing" exact>
                    <Purchasing/>
                </Route>
                <Route path="/users/new" exact>
                    <NewUser/>
                </Route>
                <Route path="/users" exact>
                    <Users/>
                </Route>
                <Route path="/users/:userId">
                    <UpdateUser/>
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
                <Route path="/machines/edit">
                    <UpdateMachine/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        );
    } else {
        routes = (
            <Switch>

                <Route path="/auth">
                    {/*<Auth/>*/}
                    <AuthNew/>
                </Route>
                <Redirect to="/auth"/>
            </Switch>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                login: login,
                logout: logout
            }}
        >
            <ThemeProvider theme={theme}>
                <Router>
                    <MainNavigation/>
                    <main>{routes}</main>
                </Router>
            </ThemeProvider>
        </AuthContext.Provider>
    );
};

export default App;
