import React, {useState, useContext} from 'react';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import Button from "../../shared/components/FormElements/Button";
import Modal from '../../shared/components/UIElements/Modal';
import {useHttpClient} from '../../shared/hooks/http-hook';
import {AuthContext} from '../../shared/context/auth-context';


import './UserItem.css';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {Col} from "react-bootstrap";

const UserItem = props => {
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
                `http://localhost:8080/auth/users/${props.id}`,
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
                    Do you want to proceed and delete this user? Please note that it
                    can't be undone thereafter.
                </p>
            </Modal>
            <Col xs={12} md={4}>
                <div className="user-item">
                    <Card className="user-item__content">
                        {isLoading && <LoadingSpinner asOverlay/>}
                        <div className="user-item__image">
                            {props.image ? <Avatar image={`http://localhost:8080/${props.image}`} alt={props.name}/> :
                                <Avatar image={props.image} alt={props.name}/>}
                        </div>
                        <div className="user-item__info">
                            <h2>{props.name}</h2>
                            <p>user ID: <strong>{props.id}</strong></p>
                            <p>NIC: {props.nic}</p>
                            <p>TELEPHONE NO: {props.telephone_no}</p>
                            <h1>USER TYPE: {props.user_type}</h1>
                        </div>
                        <div className="user-item__actions">
                            <Button to={`/users/${props.id}`}>EDIT</Button>
                            <Button danger onClick={showDeleteWarningHandler}>
                                DELETE
                            </Button>

                        </div>
                    </Card>
                </div>
            </Col>

        </React.Fragment>
    );
};

export default UserItem;
