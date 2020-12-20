import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
// import './UserForm.css';

const NewPlace = () => {
    const [formState, inputHandler] = useForm(
        {
            id: {
                value: '',
                isValid: false
            },
            fname: {
                value: '',
                isValid: false
            },
            lname: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
            dob: {
                value: '',
                isValid: false
            },
            user_type: {
                value: '',
                isValid: false
            },

        },
        false
    );

    const userSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
    };

    return (
        <form className="user-form" onSubmit={userSubmitHandler}>
            <Input
                id="id"
                element="input"
                type="text"
                label="User_id"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid ID."
                onInput={inputHandler}
            />
            {/*<Input*/}
            {/*    id="description"*/}
            {/*    element="textarea"*/}
            {/*    label="Description"*/}
            {/*    validators={[VALIDATOR_MINLENGTH(5)]}*/}
            {/*    errorText="Please enter a valid description (at least 5 characters)."*/}
            {/*    onInput={inputHandler}*/}
            {/*/>*/}
            <Input
                id="fname"
                element="input"
                label="First Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid name."
                onInput={inputHandler}
            />
            <Input
                id="lname"
                element="input"
                label="Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid name."
                onInput={inputHandler}
            />
            <Input
                id="password"
                element="input"
                label="password"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid password."
                onInput={inputHandler}
            />
            <Input
                id="dob"
                element="input"
                label="D.O.B"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid dob."
                onInput={inputHandler}
            />
            <Input
                id="user_type"
                element="input"
                label="User type"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid user type."
                onInput={inputHandler}
            />


            <Button type="submit" disabled={!formState.isValid}>
                ADD USER
            </Button>
        </form>
    );
};

export default NewPlace;
