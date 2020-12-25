import React, {useContext, useState} from 'react';

import Card from '../../shared/components/UIElements/Card';
import './SupplierItem.css';
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Grid from "@material-ui/core/Grid";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {AuthContext} from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const SupplierItem = props => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
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
                `http://localhost:8080/supp/supplier/${props.id}`,
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
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?"
                footerClass="user-item__modal-actions"
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
                    Do you want to proceed and delete this supplier? Please note that it
                    can't be undone thereafter.
                </p>
            </Modal>
            <Grid item xs={12} sm={6} md={3}>
                <div className="supplier-item">
                    <Card className="supplier-item__content">
                        {isLoading && <LoadingSpinner asOverlay/>}
                        <div className="supplier-item__info">
                            <h1>ID :{props.id}</h1>
                            <h2>{props.name}</h2>
                            <p>{props.type}</p>
                            <p>{props.telephone_no}</p>
                            <p>{props.address}</p>
                            <p>{props.status}</p>
                            <div className="supplier-item__actions">

                                <Button to={`/suppliers/${props.id}`}>EDIT</Button>

                                <Button danger onClick={showDeleteWarningHandler}>
                                    DELETE
                                </Button>
                            </div>
                        </div>

                    </Card>
                </div>
            </Grid>
        </React.Fragment>
    );
};

export default SupplierItem;
