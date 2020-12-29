import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import {useHttpClient} from '../../shared/hooks/http-hook';
import {AuthContext} from '../../shared/context/auth-context';
import './UserForm.css';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const NewUser = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
            id: {
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
            nic: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }

        },
        false
    );
    const history = useHistory();

    const userSubmitHandler = async event => {
        event.preventDefault();
        console.log(formState.inputs);
        try {
            const formData = new FormData();
            formData.append('user_id', formState.inputs.id.value);
            formData.append('name', formState.inputs.name.value);
            formData.append('password', formState.inputs.password.value);
            formData.append('dob', formState.inputs.dob.value);
            formData.append('user_type', formState.inputs.user_type.value);
            formData.append('telephone_no', formState.inputs.telephone_no.value);
            formData.append('nic', formState.inputs.nic.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('image', formState.inputs.image.value);
            await sendRequest('http://localhost:8080/auth/signup', 'PUT', formData, {
                Authorization: 'Bearer ' + auth.token
            });
            history.push('/');
        } catch (err) {
        }// send this to the backend!
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>

            <form className="user-form" onSubmit={userSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}

                <Input
                    id="id"
                    element="input"
                    type="text"
                    label="User ID"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid ID."
                    onInput={inputHandler}
                />

                <Input
                    id="name"
                    element="input"
                    label="Name"
                    type="text"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid name."
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(4)]}
                    errorText="Please enter a valid password, at least 4 characters."
                    onInput={inputHandler}
                />

                <Input
                    id="dob"
                    element="input"
                    label="D.O.B"
                    type="text"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid Birth."
                    onInput={inputHandler}
                />

                <Input
                    id="user_type" element="dropdown" label="User Type" onInput={inputHandler}
                       dropdownItems={["Officer", "Agent"]} validators={[VALIDATOR_REQUIRE()]}
                />
                <Input
                    id="telephone_no"
                    element="input"
                    label="Telephone Number"
                    type="text"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid user Telephone Number."
                    onInput={inputHandler}
                />
                <Input
                    id="nic"
                    element="input"
                    label="NIC"
                    type="text"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid user NIC."
                    onInput={inputHandler}
                />
                <Input
                    id="address"
                    element="textarea"
                    label="Address"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (at least 5 characters)."
                    onInput={inputHandler}
                />
                <ImageUpload
                    id="image"
                    onInput={inputHandler}
                    errorText="Please provide an image."
                />


                <Button type="submit" disabled={!formState.isValid}>
                    ADD USER
                </Button>
            </form>
        </React.Fragment>
    );
};

export default NewUser;
