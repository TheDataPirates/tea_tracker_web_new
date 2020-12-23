import React from 'react';

import SupplierItem from './SupplierItem';
import Card from '../../shared/components/UIElements/Card';
import {Container, Row} from "react-bootstrap";

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
        <Container>
            <Row>
                {props.items.map(supp => (
                    <SupplierItem
                        key={supp.supplier_id}
                        id={supp.supplier_id}
                        name={supp.name}
                        type={supp.type}
                        telephone_no={supp.telephone_no}
                        address={supp.address}
                        status={supp.status}
                    />
                ))}
            </Row>
        </Container>
    );
};

export default SuppliersList;