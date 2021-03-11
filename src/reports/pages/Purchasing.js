import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {useHttpClient} from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Grid from "@material-ui/core/Grid";
import Report from "../components/Report";
import makeStyles from "@material-ui/core/styles/makeStyles";
import background from "../../assets/bg15.png";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import './SupplierSelection.css';
import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_REQUIRE} from "../../shared/util/validators";
import {useForm} from "../../shared/hooks/form-hook";

const useStyles = makeStyles(theme => ({

    background: {
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        height: "100%",
        width: "100%",

    },
    card: {
        position: "absolute",
        boxShadow: theme.shadows[10],
        borderRadius: 15,
        padding: "5em 2em",
        width: "30em",
        marginBottom: "20em",
        background: " rgb(0, 0, 0, 0.3)"
    },
    root: {
        marginLeft: "5em",
        marginRight: "5em",
    },

}));

const Purchasing = () => {

    const classes = useStyles();

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedSuppliers, setLoadedSuppliers] = useState();
    // const [loadedSelectSuppliers, setLoadedSelectSuppliers] = useState();
    // let cloneSuppliers;
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
            type:{
                value:'',
                isValid:false
            }
        },
        false
    );


    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:8080/supp/suppliers'
                );

                setLoadedSuppliers(responseData.suppliers);
                // setLoadedSelectSuppliers(...loadedSuppliers);

                console.log(responseData.suppliers);



            } catch (err) {
            }
        };

        fetchSuppliers();

    }, [sendRequest]);

    const supplierSelectHandler = async (event) => {
        event.preventDefault();
        console.log(formState.inputs);

        if (formState.inputs.id.value !== '') {
            setLoadedSuppliers(prevSupplier =>
                prevSupplier.filter(supp => supp.supplier_id == formState.inputs.id.value)
            );
        }else if (formState.inputs.name.value !==''){
            setLoadedSuppliers(prevSupplier =>
                prevSupplier.filter(supp => supp.name === formState.inputs.name.value)
            );
        }else if (formState.inputs.type.value !==''){
            setLoadedSuppliers(prevSupplier =>
                prevSupplier.filter(supp => supp.type === formState.inputs.type.value )
            );
        }


        // setShowConfirmModal(false);
        // try {
        //     const responseData =   await sendRequest(
        //         `http://localhost:8080/supp/suppliers/${id}`,
        //
        //     );
        //     setLoadedSelectSuppliers(responseData.supplier);
        //     console.log(responseData.supplier);
        // } catch (err) {
        // }
    };
    const supplierResetHandler = async () => {
        try {
            const responseData = await sendRequest(
                'http://localhost:8080/supp/suppliers'
            );

            setLoadedSuppliers(responseData.suppliers);
            // setLoadedSelectSuppliers(...loadedSuppliers);

            // console.log(responseData.suppliers);

        } catch (err) {
        }

    }


    return (
        <div className={classes.background} style={{height: "65em"}}>
            <Grid container direction={"column"} spacing={3} alignItems={"center"}>
                <ErrorModal error={error} onClear={clearError}/>
                {isLoading && (
                    <div className="center">
                        <LoadingSpinner/>
                    </div>
                )}

                <Typography align={'center'} variant={'h2'}>Purchasing</Typography>
                <Grid item >
                    <form onSubmit={supplierSelectHandler} className={"supplier-profile-item__content"}>

                        <Input
                            id="id"
                            element="input"
                            type="text"
                            label="Supplier ID :"
                            validators={[]}
                            errorText="Please enter a valid ID."
                            onInput={inputHandler}
                        />


                        <Input
                            id="name"
                            element="input"
                            type="text"
                            label="Supplier Name :"
                            validators={[]}
                            errorText="Please enter a valid ID."
                            onInput={inputHandler}
                        />
                        <Input
                            id="type" element="dropdown" label="Supplier Type :" onInput={inputHandler}
                            dropdownItems={["Grower Direct", "Grower through Agent","Dealer"]} validators={[]}
                        />


                        <Button type="submit">
                            SEARCH
                        </Button>
                        <Button onClick={supplierResetHandler}>
                            RESET
                        </Button>


                    </form>
                </Grid>
                <Grid item style={{marginLeft: "5rem", marginRight: "5rem",minWidth:"70rem"}}>
                    {!isLoading && loadedSuppliers && <Report items={loadedSuppliers}
                                                              header={['ID', 'Supplier Name', 'Type', 'Telephone', 'Address', 'Status']}/>}
                </Grid>

            </Grid>
        </div>
    );
};

export default Purchasing;
