import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import './SupplierForm.css';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Emp. State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
];

const UpdateSupplier = () => {
    const [isLoading, setIsLoading] = useState(true);
    const suppId = useParams().suppId;

    const [formState, inputHandler, setFormData] = useForm(
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

    const identifiedSupplier = DUMMY_PLACES.find(p => p.id === suppId);

    useEffect(() => {
        if (identifiedSupplier) {
            setFormData(
                {
                    id: {
                        value: identifiedSupplier.id,
                        isValid: true
                    },
                    name: {
                        value: identifiedSupplier.name,
                        isValid: true
                    },
                    status: {
                        value: identifiedSupplier.status,
                        isValid: true
                    },
                    address: {
                        value: identifiedSupplier.address,
                        isValid: true
                    },
                    telephone_no: {
                        value: identifiedSupplier.telephone_no,
                        isValid: true
                    },

                },
                true
            );
        }
        setIsLoading(false);
    }, [setFormData, identifiedSupplier]);

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if (!identifiedSupplier) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find supplier</h2>
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
        <form className="supplier-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="id"
                element="input"
                type="text"
                label="Supplier_id"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid ID."
                onInput={inputHandler}
                initialValue={formState.input.id.value}
                initialValid={formState.input.id.isValid}
            />

            <Input
                id="name"
                element="input"
                label="Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid name."
                onInput={inputHandler}
                initialValue={formState.input.name.value}
                initialValid={formState.input.name.isValid}
            />
            <Input
                id="status"
                element="input"
                label="Status"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a status."
                onInput={inputHandler}
                initialValue={formState.input.status.value}
                initialValid={formState.input.status
                    .isValid}
            /><Input
            id="address"
            element="textarea"
            label="Address"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid address."
            onInput={inputHandler}
            initialValue={formState.input.address.value}
            initialValid={formState.input.address.isValid}
        />
            <Input
                id="telephone_no"
                element="input"
                label="telephone_no"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid telephone number."
                onInput={inputHandler}
                initialValue={formState.input.telephone_no.value}
                initialValid={formState.input.telephone_no.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE SUPPLIER
            </Button>
        </form>
    );
};

export default UpdateSupplier;
