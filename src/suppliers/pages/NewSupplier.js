import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './SupplierForm.css';

const NewSupplier = () => {
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
            status: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            },
            telephone_no: {
                value: '',
                isValid: false
            },

        },
        false
    );

    const supplierSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
    };

    return (
        <form className="user-form" onSubmit={supplierSubmitHandler}>
            <Input
                id="id"
                element="input"
                type="text"
                label="Supplier_id"
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
            /><Input
            id="address"
            element="textarea"
            label="Address"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid address."
            onInput={inputHandler}
        />
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
    );
};

export default NewSupplier;
