import React, {useState} from 'react';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import Button from "../../shared/components/FormElements/Button";
import Modal from '../../shared/components/UIElements/Modal';

import './UserItem.css';

const UserItem = props => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false);
        console.log('DELETING...');
    };
    return (
        <React.Fragment>

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

            <li className="user-item">
                <Card className="user-item__content">
                        <div className="user-item__image">
                            <Avatar image={props.image} alt={props.name} />
                        </div>
                        <div className="user-item__info">
                            <h2>{props.name}</h2>
                            <h3>user ID: {props.id}</h3>
                            <h3>NIC: {props.nic}</h3>
                            <h3>TELEPHONE NO: {props.telephone_no}</h3>
                            <h1>USER TYPE: {props.user_type}</h1>
                        </div>
                    <div className="user-item__actions">


                            <Button to={`/users/${props.id}`}>EDIT</Button>
                            <Button danger onClick={showDeleteWarningHandler}>
                                DELETE
                            </Button>

                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default UserItem;
