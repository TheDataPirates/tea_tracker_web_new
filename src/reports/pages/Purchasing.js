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
import './SupplierProfile.css';

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
    }
}));

const Purchasing = () => {

    const classes = useStyles();

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedSuppliers, setLoadedSuppliers] = useState();
    const [loadedSelectSuppliers, setLoadedSelectSuppliers] = useState();


    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:8080/supp/suppliers'
                );

                setLoadedSuppliers(responseData.suppliers);
                console.log(responseData.suppliers);
            } catch (err) {
            }
        };
        fetchSuppliers();
    }, [sendRequest]);

    const supplierProfileHandler = async (id) => {

        // setShowConfirmModal(false);
        try {
            const responseData =   await sendRequest(
                `http://localhost:8080/supp/suppliers/${id}`,

            );
            setLoadedSelectSuppliers(responseData.supplier);
            console.log(responseData.supplier);
        } catch (err) {
        }
    };

    return (
        <div className={classes.background} style={{height:"65em"}}>
            <Grid container direction={"column"} spacing={3}>
                <ErrorModal error={error} onClear={clearError}/>
                {isLoading && (
                    <div className="center">
                        <LoadingSpinner/>
                    </div>
                )}
                <Typography align={'center'} variant={'h2'}>Purchasing</Typography>
                <Grid item style={{marginLeft:"5rem",marginRight:"5rem"}}>
                    {!isLoading && loadedSuppliers && <Report items={loadedSuppliers} onSelect={supplierProfileHandler} />}
                </Grid>
                {/*<Grid item container justify={"center"}>*/}
                {/*    <Grid item>*/}
                {/*    { loadedSelectSuppliers&&*/}
                {/*    <Card className="supplier-profile-item__content">*/}
                {/*        {isLoading && <LoadingSpinner asOverlay/>}*/}
                {/*        <div className="supplier-profile-item__image">*/}
                {/*            <img*/}
                {/*                src={`http://localhost:8080/${loadedSelectSuppliers[0].image}`}*/}
                {/*                alt={loadedSelectSuppliers[0].name}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <div className="supplier-profile-item__info">*/}
                {/*            <h1>{loadedSelectSuppliers[0].name}</h1>*/}
                {/*            <h2>{loadedSelectSuppliers[0].supplier_id}</h2>*/}
                {/*            <p>{loadedSelectSuppliers[0].type}</p>*/}
                {/*            <h3>{loadedSelectSuppliers[0].address}</h3>*/}
                {/*            <h4>{loadedSelectSuppliers[0].status}</h4>*/}
                {/*            <p>{loadedSelectSuppliers[0].telephone_no}</p>*/}

                {/*        </div>*/}
                {/*        <div className="supplier-profile-item__actions">*/}
                {/*            <Button to={`/suppliers/${loadedSelectSuppliers[0].supplier_id}`}>EDIT</Button>*/}
                {/*        </div>*/}

                {/*    </Card>*/}
                {/*    }*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
            </Grid>
        </div>
    );
};

export default Purchasing;
