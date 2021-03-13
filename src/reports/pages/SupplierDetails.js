import React, { useContext, useEffect, useState } from 'react';
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Report from "../components/Report";
import { useHttpClient } from "../../shared/hooks/http-hook";
import makeStyles from "@material-ui/core/styles/makeStyles";
import background from "../../assets/bg15.png";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import qs from "query-string";


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


const SupplierDetails = () => {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const parsed = qs.parse(window.location.search);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedSupplierData, setLoadedSupplierData] = useState();
    // const suppId = useParams().suppId;
    // const [loadedSelectSuppliers, setLoadedSelectSuppliers] = useState();


    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:8080/supp/reports/supplier/${parsed.supplier_id}`, 'GET', null, {
                    Authorization: 'Bearer ' + auth.token
                }
                );

                // setLoadedSupplierData(responseData.supplier);
                console.log("Res");
                console.log(responseData.supplier);
                // console.log(loadedSupplierData);
                // console.log("called");
                // console.log(mergeObject);
                // console.log(responseData.supplier.length);
                let dataSet = (responseData.supplier.length) / 3;
                console.log(responseData.supplier.length);
                console.log(dataSet);
                let result = {};
                let merge = [];
                for (let i = 0; i < dataSet; i++) {
                    // console.log("For1");

                    for (let j = ((i + 2) * i); j <= ((i + 2) * i) + 2; j++) {
                        result[responseData.supplier[j].grade_GL] = responseData.supplier[j].total_Gross_weight;
                        // console.log("re");
                        // console.log(result);
                        // result.push(responseData.supplier[i].date);
                        result = {...result,data:responseData.supplier[j].date};
                        console.log(j);
                        
                        
                    }
                    let ordered = Object.keys(result).sort().reduce( //sorting gl grades ascending order(A,B.C)
                            (obj, key) => {
                                obj[key] = result[key];
                                return obj;
                            },
                            {}
                        );
                    merge.push({
                        supplier_id: parsed.supplier_id,
                        name: parsed.name,
                        type: parsed.type,
                        ...ordered,
                        // date: responseData.supplier[j].date

                    });

                    

                }

                
                console.log("merge");
                console.log(merge);

                setLoadedSupplierData(merge);
                // console.log(loadedSupplierData);

            } catch (err) {
            }
        };

        fetchSuppliers();
    }, [sendRequest]);

    // const mergeSupplierObject = () => {
    //     let mergeObject = loadedSupplierData.reduce(function (acc, val) {
    //         return Object.assign(acc, val);
    //     }, {});
    //     console.log(mergeObject);
    //     //     setLoadedSupplierData({
    //     //         value: {
    //     //             ...mergeObject,
    //     //             isAvailable: newValue
    //     //         }
    //     //     }
    //     // )
    //     //     ;
    // }

    return (
        <div className={classes.background} style={{ height: "65em" }}>
            <Grid container direction={"column"} spacing={3}>
                <ErrorModal error={error} onClear={clearError} />

                <Grid item>
                    <Typography align={'center'} variant={'h2'}>Purchasing</Typography>
                </Grid>
                <Grid item style={{ marginLeft: "5rem", marginRight: "5rem" }}>
                    {isLoading && (
                        <div className="center">
                            <LoadingSpinner />
                        </div>
                    )}
                    {!isLoading && loadedSupplierData && <Report items={loadedSupplierData}
                        header={['ID', 'Supplier Name', 'Type', 'GL A', 'GL B', 'GL C', 'Date']} />}
                </Grid>

            </Grid>
        </div>

    );
};

export default SupplierDetails;
