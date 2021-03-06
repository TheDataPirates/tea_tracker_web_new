import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';
import Grid from '@material-ui/core/Grid';

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
        // <div className={classes.root}>
        <Grid container spacing={3} >

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
        </Grid>
        // </div>
    );
};

export default UsersList;
