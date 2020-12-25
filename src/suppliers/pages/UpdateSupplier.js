import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import './SupplierForm.css';
import {AuthContext} from "../../shared/context/auth-context";
import {useHttpClient} from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";


const UpdateSupplier = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedSupplier, setLoadedSupplier] = useState();
    const history = useHistory();
    const suppId = useParams().suppId;

    const [formState, inputHandler, setFormData] = useForm(
        {
            supplier_id: {
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


    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:8080/supp/suppliers/${suppId}`
                );
                console.log(responseData.supplier);

                setLoadedSupplier(responseData.supplier[0]);
                setFormData(
                    {
                        supplier_id: {
                            value: responseData.supplier[0].supplier_id,
                            isValid: true
                        },
                        name: {
                            value: responseData.supplier[0].name,
                            isValid: true
                        },

                        type: {
                            value: responseData.supplier[0].type,
                            isValid: true
                        },
                        telephone_no: {
                            value: responseData.supplier[0].telephone_no,
                            isValid: true
                        },
                        address: {
                            value: responseData.supplier[0].address,
                            isValid: true
                        },
                        status: {
                            value: responseData.supplier[0].status,
                            isValid: true
                        }

                    },
                    true
                );
            } catch (err) {
            }
        };
        fetchSupplier();

    }, [sendRequest, setFormData,suppId]);

    const placeUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                'http://localhost:8080/supp/suppliers',
                'PATCH',
                JSON.stringify({
                    supplier_id: formState.inputs.supplier_id.value,
                    name: formState.inputs.name.value,
                    status: formState.inputs.status.value,
                    type: formState.inputs.type.value,
                    telephone_no: formState.inputs.telephone_no.value,
                    address: formState.inputs.address.value,
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push('/supplier');
        } catch (err) {
        }
    };

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner/>
            </div>
        );
    }

    if (!loadedSupplier && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find supplier!</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {!isLoading && loadedSupplier && (
                <form className="supplier-form" onSubmit={placeUpdateSubmitHandler}>
                    <Input
                        id="supplier_id"
                        element="input"
                        type="text"
                        label="Supplier_id"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid ID."
                        onInput={inputHandler}
                        initialValue={loadedSupplier.supplier_id}
                        initialValid={true}
                    />

                    <Input
                        id="name"
                        element="input"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid name."
                        onInput={inputHandler}
                        initialValue={loadedSupplier.name}
                        initialValid={true}
                    />
                    <Input
                        id="status"
                        element="input"
                        label="Status"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a status."
                        onInput={inputHandler}
                        initialValue={loadedSupplier.status}
                        initialValid={true}
                    />
                    <Input
                        id="type"
                        element="input"
                        label="TYPE"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a status."
                        onInput={inputHandler}
                        initialValue={loadedSupplier.type}
                        initialValid={true}
                    />
                    <Input
                        id="address"
                        element="textarea"
                        label="Address"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid address."
                        onInput={inputHandler}
                        initialValue={loadedSupplier.address}
                        initialValid={true}
                    />
                    <Input
                        id="telephone_no"
                        element="input"
                        label="telephone_no"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid telephone number."
                        onInput={inputHandler}
                        initialValue={loadedSupplier.telephone_no}
                        initialValid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        UPDATE SUPPLIER
                    </Button>
                </form>
            )}
        </React.Fragment>
    );
};

export default UpdateSupplier;
