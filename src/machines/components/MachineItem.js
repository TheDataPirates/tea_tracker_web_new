import React, {useState} from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from "../../shared/components/FormElements/Button";
import Modal from '../../shared/components/UIElements/Modal';

import './MachineItem.css';

const MachineItem = props => {
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

            <li className="machine-item">
                <Card className="machine-item__content">
                    <div className="machine-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="machine-item__info">
                        <h2>Machine ID: {props.id}</h2>
                        <h3>
                            Name: <strong>{props.fname}</strong>
                        </h3>
                    </div>
                    <div className="machine-item__actions">


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

export default MachineItem;
