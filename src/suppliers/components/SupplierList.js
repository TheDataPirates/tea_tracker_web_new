import React from 'react';

import SupplierItem from './SupplierItem';
import Card from '../../shared/components/UIElements/Card';
import './SupplierList.css';

const SuppliersList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No Supplier found.</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className="supplier-list">
            {props.items.map(user => (
                <SupplierItem
                    key={user.id}
                    id={user.id}
                    name={user.name}

                />
            ))}
        </ul>
    );
};

export default SuppliersList;