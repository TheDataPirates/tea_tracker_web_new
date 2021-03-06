import React, {useContext} from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import './SupplierForm.css';
import {AuthContext} from "../../shared/context/auth-context";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useHistory} from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const NewSupplier = () => {
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
            type: {
                value: '',
                isValid: false
            },
            telephone_no: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            },
            status: {
                value: '',
                isValid: false
            },

        },
        false
    );
    const history = useHistory();


    const supplierSubmitHandler = async event => {
        event.preventDefault();
        console.log(formState.inputs);
        try {
            // const formData = new FormData();
            // formData.append('supplier_id', formState.inputs.id.value);
            // formData.append('name', formState.inputs.name.value);
            // formData.append('type', formState.inputs.type.value);
            // formData.append('telephone_no', formState.inputs.telephone_no.value);
            // formData.append('address', formState.inputs.address.value);
            // formData.append('status', formState.inputs.status.value);
            await sendRequest('http://localhost:8080/supp/supplier', 'POST', JSON.stringify({
                supplier_id: formState.inputs.id.value,
                name: formState.inputs.name.value,
                type: formState.inputs.type.value,
                telephone_no: formState.inputs.telephone_no.value,
                address: formState.inputs.address.value,
                status: formState.inputs.status.value
            }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            history.push('/');
        } catch (err) {
        }// send this to the backend!
    };

    return (
        <React.Fragment>

            <ErrorModal error={error} onClear={clearError}/>

            <form className="user-form" onSubmit={supplierSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}

                <Input
                    id="id"
                    element="input"
                    type="text"
                    label="Supplier ID"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid ID."
                    onInput={inputHandler}
                />

                <Input
                    id="name"
                    element="input"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid name."
                    onInput={inputHandler}
                />
                <Input
                    id="status"
                    element="input"
                    label="Status"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a status."
                    onInput={inputHandler}
                />
                <Input
                    id="address"
                    element="textarea"
                    label="Address"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid address."
                    onInput={inputHandler}
                />

                <Input id="type" element="dropdown" label="TYPE" onInput={inputHandler}
                       dropdownItems={["State", "Villager"]} validators={[VALIDATOR_REQUIRE()]}/>
                <Input
                    id="telephone_no"
                    element="input"
                    label="telephone_no"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid telephone number."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD SUPPLIER
                </Button>
            </form>
        </React.Fragment>
    );
};

export default NewSupplier;
