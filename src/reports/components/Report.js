import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

// function createData(name, calories, fat, carbs, protein) {
//     return {name, calories, fat, carbs, protein};
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const Report = (props) => {
    const history = useHistory();
    const classes = useStyles();


    return (
        <TableContainer component={Paper} elevation={3} square={false}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Supplier Name</TableCell>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Telephone</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.items.map((row) => (
                        <TableRow key={row.name} onClick={()=> history.push(`/reports/purchasing/${row.supplier_id}`)}>

                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.supplier_id}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.telephone_no}</TableCell>
                            <TableCell align="right">{row.address}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default Report;