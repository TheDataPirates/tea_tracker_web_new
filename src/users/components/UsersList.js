import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';
import  {Container,Row} from "react-bootstrap";
import './UsersList.css';

const UsersList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No users found.</h2>
                </Card>
            </div>
        );
    }

    return (
        <Container>
            <Row>
                {props.items.map(user => (
                    <UserItem
                        key={user.user_id}
                        id={user.user_id}
                        image={user.image}
                        name={user.name}
                        nic={user.nic}
                        telephone_no={user.telephone_no}
                        user_type={user.user_type}
                        onDelete={props.onDeleteUser}
                    />
                ))}
            </Row>
        </Container>
    );
};

export default UsersList;
