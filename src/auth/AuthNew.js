import React, {useContext} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import makeStyles from "@material-ui/core/styles/makeStyles";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import Input from "../shared/components/FormElements/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../shared/util/validators";
import Button from "../shared/components/FormElements/Button";
import {AuthContext} from "../shared/context/auth-context";
import {useHttpClient} from "../shared/hooks/http-hook";
import {useForm} from "../shared/hooks/form-hook";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import Grid from "@material-ui/core/Grid";
import background from "../assets/bg15.png";

const useStyles = makeStyles(theme=>({

    background: {
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize:'cover',
        height: "100%",
        width: "100%"
    },
    card:{
        position:"absolute",
        boxShadow:theme.shadows[10],
        borderRadius:15,
        padding:"5em 2em",
        width:"30em",
        marginBottom:"20em",
        background:" rgb(0, 0, 0, 0.3)"
    }
}));

const AuthNew = () => {
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
        <Grid container alignItems={"center"} justify={"center"} style={{height:"60em"}}>
                <Card className={classes.card}>
                    <ErrorModal error={error} onClear={clearError}/>
                    <CardContent>
                        {isLoading && <LoadingSpinner asOverlay/>}
                        <h2 style={{color:"white", textAlign:"center"}}>Login Required</h2>
                        <hr style={{height:"0.15rem", color:"white", backgroundColor:"white"}} />
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
                                label="PASSWORD"
                                validators={[VALIDATOR_MINLENGTH(4)]}
                                errorText="Please enter a valid password, at least 5 characters."
                                onInput={inputHandler}
                            />
                            <Button type="submit" disabled={!formState.isValid}>
                                LOGIN
                            </Button>
                        </form>
                    </CardContent>

                </Card>
            <div className={classes.background}/>
        </Grid>
    );
};

export default AuthNew;
