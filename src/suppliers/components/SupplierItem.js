import React, {useState} from 'react';

import Card from '../../shared/components/UIElements/Card';
import './SupplierItem.css';
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";

const SupplierItem = props => {
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
            <li className="supplier-item">
                <Card className="supplier-item__content">
                    <div className="supplier-item__info">
                        <h1>{props.id}</h1>
                        <h2>{props.name}</h2>
                        <h3>supplier
                        </h3>
                        <div className="supplier-item__actions">

                            <Button to={`/suppliers/${props.id}`}>EDIT</Button>

                            <Button danger onClick={showDeleteWarningHandler}>
                                DELETE
                            </Button>
                        </div>
                    </div>

                </Card>
            </li>
        </React.Fragment>
    );
};

export default SupplierItem;
