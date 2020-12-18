import React from 'react';

import MachineItem from './MachineItem';
import Card from '../../shared/components/UIElements/Card';
import './MachineList.css';

const MachineList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No machines found.</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className="machine-list">
            {props.items.map(user => (
                <MachineItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    fname={user.name}

                />
            ))}
        </ul>
    );
};

export default MachineList;
