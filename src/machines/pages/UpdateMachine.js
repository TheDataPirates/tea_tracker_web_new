import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import './MachineForm.css';
import {AuthContext} from "../../shared/context/auth-context";
import {useHttpClient} from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import qs from 'query-string';



const UpdateMachine = (props) => {

// console.log(props);
    const parsed = qs.parse(window.location.search);
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedMachine, setLoadedMachine] = useState();
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm(
        {
            id: {
                value: '',
                isValid: false
            },
            modal: {
                value: '',
                isValid: false
            },
            machine_purchase_date: {
                value: '',
                isValid: false
            },
            power_info: {
                value: '',
                isValid: false
            },
        },
        false
    );


    useEffect(() => {
        const fetchMachine = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:8080/machine/machine?id=${parsed.machine_id}&type=${parsed.type}`
                );
                console.log(responseData.machine);

                setLoadedMachine(responseData.machine[0]);
                setFormData(
                    {
                        id: {
                            value: responseData.machine[0].id,
                            isValid: true
                        },
                        modal: {
                            value: responseData.machine[0].modal,
                            isValid: true
                        },
                        machine_purchase_date: {
                            value: responseData.machine[0].machine_purchase_date,
                            isValid: true
                        },
                        power_info: {
                            value: responseData.machine[0].power_info,
                            isValid: true
                        },

                    },
                    true
                );
            } catch (err) {
            }
        };
        fetchMachine();

    }, [sendRequest, setFormData,parsed.machine_id,parsed.type]);

    const machineUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:8080/machine/machines/${parsed.type}`,
                'PATCH',
                JSON.stringify({
                    machine_id: formState.inputs.id.value,
                    modal: formState.inputs.modal.value,
                    machine_purchase_date: formState.inputs.machine_purchase_date.value,
                    power_info: formState.inputs.power_info.value,
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push('/machines');
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

    if (!loadedMachine && !error) {
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
            {!isLoading && loadedMachine && (
                <form className="supplier-form" onSubmit={machineUpdateSubmitHandler}>
                    <Input
                        id="id"
                        element="input"
                        type="text"
                        label="Machine ID"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid ID."
                        onInput={inputHandler}
                        initialValue={loadedMachine.id}
                        initialValid={true}
                    />

                    <Input
                        id="modal"
                        element="input"
                        label="Modal"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid modal."
                        onInput={inputHandler}
                        initialValue={loadedMachine.modal}
                        initialValid={true}
                    />
                    <Input
                        id="machine_purchase_date"
                        element="input"
                        label="Machine Purchased Date"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid date."
                        onInput={inputHandler}
                        initialValue={loadedMachine.machine_purchase_date}
                        initialValid={true}
                    />
                    <Input
                        id="power_info"
                        element="input"
                        label="Power Information"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid information."
                        onInput={inputHandler}
                        initialValue={loadedMachine.power_info}
                        initialValid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        UPDATE MACHINE
                    </Button>
                </form>
            )}
        </React.Fragment>
    );
};

export default UpdateMachine;
