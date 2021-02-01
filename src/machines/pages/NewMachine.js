import React, {useContext} from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import {useHttpClient} from '../../shared/hooks/http-hook';

import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {AuthContext} from "../../shared/context/auth-context";
import {useHistory} from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import background from "../../assets/bg15.png";
import { Paper } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import './MachineForm.css';

const NewMachine = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler] = useForm(
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
            type: {
                value: '',
                isValid: false
            },
        },
        false
    );

    const history = useHistory();

    const styles = {
        paperContainer: {
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
            height: "100%",
            width: "100%"
        }
    };

    const machineSubmitHandler = async event => {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
        try {
            const formData = new FormData();

            formData.append('machine_id', formState.inputs.id.value);
            formData.append('modal', formState.inputs.modal.value);
            formData.append('machine_purchase_date', formState.inputs.machine_purchase_date.value);
            formData.append('power_info', formState.inputs.power_info.value);
            formData.append('type', formState.inputs.type.value);
            formData.append('image', formState.inputs.image.value);

            await sendRequest('http://localhost:8080/machine/machine', 'POST', formData, {
                Authorization: 'Bearer ' + auth.token
            });
            history.push('/');
        } catch (err) {
        }// send this to the backend!
    };

    return (
        <React.Fragment>
            <Grid container alignItems={"center"} justify={"center"}>
                <Paper style={styles.paperContainer}>
            <ErrorModal error={error} onClear={clearError}/>
            <form className="machine-form" onSubmit={machineSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}

                <Input
                    id="id"
                    element="input"
                    type="text"
                    label="Machine ID :"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid ID."
                    onInput={inputHandler}
                />

                <Input
                    id="modal"
                    element="input"
                    label="Modal :"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid modal."
                    onInput={inputHandler}
                />
                <Input
                    id="machine_purchase_date"
                    element="input"
                    label="Machine Purchased Date : "
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid date."
                    onInput={inputHandler}
                />
                <Input
                    id="power_info"
                    element="input"
                    label="Power Information :"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid information."
                    onInput={inputHandler}
                />

                <Input
                    id="type"
                    element="input"
                    label="Machine Type: Drier / Roll Breaker / Roller"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid type."
                    onInput={inputHandler}
                />
                <ImageUpload
                    id="image"
                    onInput={inputHandler}
                    errorText="Please provide an image."
                />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD MACHINE
                </Button>
            </form>
            </Paper>
            </Grid>
        </React.Fragment>
    );
};

export default NewMachine;
