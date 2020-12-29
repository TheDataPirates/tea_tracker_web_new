import React, {useContext, useState} from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from "../../shared/components/FormElements/Button";
import Modal from '../../shared/components/UIElements/Modal';

import './DrierItem.css';
import {useHttpClient} from "../../shared/hooks/http-hook";
import {AuthContext} from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Grid from "@material-ui/core/Grid";
import qs from 'query-string';


const DrierItem = props => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext);


    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);

    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(
                `http://localhost:8080/machine/machine?id=${props.id}&type=${props.type}`,
                'DELETE',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            props.onDelete(props.id);
        } catch (err) {
        }
    };
    // eslint-disable-next-line no-restricted-globals
    const queryParam = qs.parse(location.search);
    const newQueryParam = {
        ...queryParam,
        machine_id: props.id,
        type: props.type,
    }
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>

            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?"
                footerClass="machine-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>
                            CANCEL
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            DELETE
                        </Button>
                    </React.Fragment>
                }
            >
                <p>
                    Do you want to proceed and delete this Machine? Please note that it
                    can't be undone thereafter.
                </p>
            </Modal>
            <Grid item xs={12} sm={6} md={4} style={{textAlign:"center"}}>
                <div className="machine-item">
                    <Card className="machine-item__content">
                        {isLoading && <LoadingSpinner asOverlay/>}
                        <div className="machine-item__image">
                            <img src={`http://localhost:8080/${props.image}`} alt={props.modal}/>
                        </div>
                        <div className="machine-item__info">
                            <h2>Machine ID: {props.id}</h2>
                            <h3>
                                modal: <strong>{props.modal}</strong>
                            </h3>
                            <p>purchased date : {props.machine_purchase_date}</p>
                            <p>power info : {props.power_info}</p>

                        </div>
                        <div className="machine-item__actions">

                            <Button to={{ pathname: '/machines/edit', search: qs.stringify(newQueryParam)}}>EDIT</Button>

                            <Button danger onClick={showDeleteWarningHandler}>
                                DELETE
                            </Button>

                        </div>
                    </Card>
                </div>
            </Grid>
        </React.Fragment>
    );
};

export default DrierItem;
