import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './UserForm.css';

const DUMMY_PLACES = [
    {
        id: 'p1',
        fname: 'Empire State Building',
        lname: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        dob: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        user_type: 'u1'
    },
    {
        id: 'p2',
        fname: 'Emp. State Building',
        lname: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        dob: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        user_type: 'u2'
    }
];

const UpdateUser = () => {
    const [isLoading, setIsLoading] = useState(true);
    const userId = useParams().userId;

    const [formState, inputHandler, setFormData] = useForm(
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

    const identifiedUser = DUMMY_PLACES.find(p => p.id === userId);

    useEffect(() => {
        if (identifiedUser) {
            setFormData(
                {
                    id: {
                        value: identifiedUser.id,
                        isValid: false
                    },
                    fname: {
                        value: identifiedUser.fname,
                        isValid: false
                    },
                    lname: {
                        value: identifiedUser.lname,
                        isValid: false
                    },
                    password: {
                        value: '',
                        isValid: false
                    },
                    dob: {
                        value: identifiedUser.dob,
                        isValid: false
                    },
                    user_type: {
                        value: identifiedUser.user_type,
                        isValid: false
                    },

                },
                true
            );
        }
        setIsLoading(false);
    }, [setFormData, identifiedUser]);

    const userUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if (!identifiedUser) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <form className="place-form" onSubmit={userUpdateSubmitHandler}>
            <Input
                id="id"
                element="input"
                type="text"
                label="User_id"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid ID."
                onInput={inputHandler}
                initialValue = {formState.input.id.value}
                initialValid = {formState.input.id.isValid}

            />
            <Input
                id="fname"
                element="input"
                label="First Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid name."
                onInput={inputHandler}
                initialValue = {formState.input.fname.value}
                initialValid = {formState.input.fname.isValid}
            />
            <Input
                id="lname"
                element="input"
                label="Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid name."
                onInput={inputHandler}
                initialValue = {formState.input.lname.value}
                initialValid = {formState.input.lname.isValid}
            />
            <Input
                id="password"
                element="input"
                label="password"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid password."
                onInput={inputHandler}
                initialValue = {formState.input.password.value}
                initialValid = {formState.input.password.isValid}
            />
            <Input
                id="dob"
                element="input"
                label="D.O.B"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid dob."
                onInput={inputHandler}
                initialValue = {formState.input.dob.value}
                initialValid = {formState.input.dob.isValid}
            />
            <Input
                id="user_type"
                element="input"
                label="User type"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid user type."
                onInput={inputHandler}
                initialValue = {formState.input.user_type.value}
                initialValid = {formState.input.user_type.isValid}
            />

            <Button type="submit" disabled={!formState.isValid}>
                UPDATE USER
            </Button>
        </form>
    );
};

export default UpdateUser;
