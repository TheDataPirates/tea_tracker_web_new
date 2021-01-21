import React, {useContext} from 'react';

import Card from '../shared/components/UIElements/Card';
import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import Grid from "@material-ui/core/Grid";

import {
    VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH
} from '../shared/util/validators';
import {useForm} from '../shared/hooks/form-hook';
import {AuthContext} from '../shared/context/auth-context';
import {useHttpClient} from '../shared/hooks/http-hook';

import './Auth.css';
import makeStyles from "@material-ui/core/styles/makeStyles";
import background from '../assets/bg11.jpg';

const useStyles = makeStyles({
    background: {
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize:'cover',
        height: "100%",
        width: "100%"
    },
});

const Auth = () => {
    const classes = useStyles();
    const auth = useContext(AuthContext);

    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const [formState, inputHandler] = useForm(
        {
            user_id: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );


    const authSubmitHandler = async event => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                'http://localhost:8080/auth/login',
                'POST',
                JSON.stringify({
                    user_id: formState.inputs.user_id.value,
                    password: formState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            auth.login(responseData.userId, responseData.token);

        } catch (err) {
        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Card className={"authentication"}>
                {isLoading && <LoadingSpinner asOverlay/>}
                <h2>Login Required</h2>
                <hr/>
                <form onSubmit={authSubmitHandler}>
                    <Input
                        element="input"
                        id="user_id"
                        type="text"
                        label="USER ID"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid email address."
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="password"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(4)]}
                        errorText="Please enter a valid password, at least 5 characters."
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        LOGIN
                    </Button>
                </form>
            </Card>
        </React.Fragment>
    );
};

export default Auth;
