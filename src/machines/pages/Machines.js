import React, {useEffect, useState} from 'react';

import MachineList from '../components/MachineList';
import {useHttpClient} from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Machines = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedRollers, setLoadedRollers] = useState();
    const [loadedDriers, setLoadedDriers] = useState();
    const [loadedRollBreakers, setLoadedRollBreakers] = useState();

    useEffect(() => {
        const fetchMachines = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:8080/machine/machines'
                );
                setLoadedRollers(responseData.rollers)
                setLoadedDriers(responseData.driers);
                setLoadedRollBreakers(responseData.roll_breaker);
                console.log(responseData);
            } catch (err) {
            }
        };
        fetchMachines();
    }, [sendRequest]);


    const rbDeletedHandler = deletedId => {
        setLoadedRollBreakers(prevMachine =>
            prevMachine.filter(rb => rb.roll_breaker_id !== deletedId)
        );
    };
    const rollerDeletedHandler = deletedId => {
        setLoadedRollers(prevMachine =>
            prevMachine.filter(rb => rb.roller_id !== deletedId)
        );
    };
    const drierDeletedHandler = deletedId => {
        setLoadedDriers(prevMachine =>
            prevMachine.filter(rb => rb.drier_id !== deletedId)
        );
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner/>
                </div>
            )}
            {!isLoading && loadedRollBreakers && loadedDriers && loadedRollers  &&<MachineList rb_items={loadedRollBreakers} roll_item={loadedRollers} drier_item={loadedDriers} onDeleteRB={rbDeletedHandler} onDeleteRoller={rollerDeletedHandler} onDeleteDrier={drierDeletedHandler}/>}
        </React.Fragment>
    );
};

export default Machines;
