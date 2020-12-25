import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './UserForm.css';

const UpdateUser = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUser, setLoadedUser] = useState();
    const userId = useParams().userId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm(
        {
            user_id: {
                value: '',
                isValid: false
            },
            name: {
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
            telephone_no: {
                value: '',
                isValid: false
            },
            nic:{
                value:'',
                isValid:false
            },
            address:{
                value:'',
                isValid:false
            }

        },
        false
    );

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:8080/auth/users/${userId}`
                );
                console.log(responseData.user[0].user_id);
                setLoadedUser(responseData.user[0]);
                setFormData(
                    {
                        user_id: {
                            value: responseData.user[0].user_id,
                            isValid: true
                        },
                        name: {
                            value: responseData.user[0].name,
                            isValid: true
                        },

                        dob: {
                            value: responseData.user[0].dob,
                            isValid: true
                        },
                        user_type: {
                            value: responseData.user[0].user_type,
                            isValid: true
                        },
                        telephone_no: {
                            value: responseData.user[0].telephone_no,
                            isValid: true
                        },
                        nic:{
                            value:responseData.user[0].nic,
                            isValid:true
                        },
                        address:{
                            value:responseData.user[0].address,
                            isValid:true
                        }

                    },
                    true
                );
            } catch (err) {}
        };
        fetchUsers();

    }, [sendRequest, userId, setFormData]);

    const userUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                'http://localhost:8080/auth/users',
                'PATCH',
                JSON.stringify({
                    user_id: formState.inputs.user_id.value,
                    password:formState.inputs.password.value,
                    name: formState.inputs.name.value,
                    dob:formState.inputs.dob.value,
                    user_type:formState.inputs.user_type.value,
                    telephone_no:formState.inputs.telephone_no.value,
                    nic:formState.inputs.nic.value,
                    address:formState.inputs.address.value,
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            console.log('pressed');
            history.push('/users');
        } catch (err) {}
    };

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!loadedUser && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find user!</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedUser && (
                <form className="user-form" onSubmit={userUpdateSubmitHandler}>
                    <Input
                        id="id"
                        element="input"
                        type="text"
                        label="User ID"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid ID."
                        onInput={inputHandler}
                        initialValue={loadedUser.user_id}
                        initialValid={true}
                    />

                    <Input
                        id="name"
                        element="input"
                        label="Name"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid name."
                        onInput={inputHandler}
                        initialValue={loadedUser.name}
                        initialValid={true}
                    />
                    <Input
                        element="input"
                        id="password"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(4)]}
                        errorText="Please enter a valid password, at least 4 characters."
                        onInput={inputHandler}
                        initialValid={false}
                    />

                    <Input
                        id="dob"
                        element="input"
                        label="D.O.B"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid Birth."
                        onInput={inputHandler}
                        initialValue={loadedUser.dob}
                        initialValid={true}
                    />
                    <Input
                        id="user_type"
                        element="input"
                        label="User Type"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid User Type."
                        onInput={inputHandler}
                        initialValue={loadedUser.user_type}
                        initialValid={true}
                    />
                    <Input
                        id="telephone_no"
                        element="input"
                        label="Telephone Number"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid user Telephone Number."
                        onInput={inputHandler}
                        initialValue={loadedUser.telephone_no}
                        initialValid={true}
                    />
                    <Input
                        id="nic"
                        element="input"
                        label="NIC"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid user NIC."
                        onInput={inputHandler}
                        initialValue={loadedUser.nic}
                        initialValid={true}
                    />
                    <Input
                        id="address"
                        element="textarea"
                        label="Address"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid description (at least 5 characters)."
                        onInput={inputHandler}
                        initialValue={loadedUser.address}
                        initialValid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        UPDATE USER
                    </Button>
                </form>
            )}
        </React.Fragment>
    );
};

export default UpdateUser;
