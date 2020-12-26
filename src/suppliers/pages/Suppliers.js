import React, {useEffect, useState} from 'react';
import SuppliersList from "../components/SupplierList";
import {useHttpClient} from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Suppliers = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedSuppliers, setLoadedSuppliers] = useState();

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:8080/supp/suppliers'
                );

                setLoadedSuppliers(responseData.suppliers);
                console.log(responseData.suppliers);
            } catch (err) {}
        };
        fetchSuppliers();
    }, [sendRequest]);


    const supplierDeletedHandler = deletedSupplierId => {
        setLoadedSuppliers(prevUsers =>
            prevUsers.filter(supp => supp.supplier_id !== deletedSupplierId)
        );
    };


    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedSuppliers &&  <SuppliersList items={loadedSuppliers}  onDeleteSupplier={supplierDeletedHandler} />}
        </React.Fragment>
    )
};

export default Suppliers;
