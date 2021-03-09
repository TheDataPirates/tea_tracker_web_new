import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useHistory} from "react-router-dom";
import qs from "query-string";

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
    const queryParam = qs.parse(window.location.search);
    // const newQueryParam = {
    //     ...queryParam,
    //     supplier_id: props.id,
    //     type: props.type,
    //     name:
    //
    // }

    return (
        <TableContainer component={Paper} elevation={3} square={false}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {props.header.map((col) => (
                            <TableCell>{col}</TableCell>
                        ))}
                        {/*<TableCell>Supplier Name</TableCell>*/}
                        {/*<TableCell align="right">ID</TableCell>*/}
                        {/*<TableCell align="right">Type</TableCell>*/}
                        {/*<TableCell align="right">Telephone</TableCell>*/}
                        {/*<TableCell align="right">Address</TableCell>*/}
                        {/*<TableCell align="right">Status</TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.items.map((row) => {
                        // let i = supplier_id;
                        // console.log(row[Object.keys(row)[3]]);
                        return (
                            <TableRow key={row.name}
                                      onClick={() => history.push({pathname: '/reports/purchasing/supplierlots', search:qs.stringify({
                                          ...queryParam,
                                          supplier_id: row.supplier_id,
                                          type: row.type,
                                          name:row.name

                                      })})}>


                                {props.header.map((col, i) => (//header used for column count


                                    <TableCell component="th" scope="row">
                                        {row[Object.keys(row)[i]]}
                                    </TableCell>

                                ))}
                                {/*<TableCell align="right">{row.supplier_id}</TableCell>*/}
                                {/*<TableCell align="right">{row.type}</TableCell>*/}
                                {/*<TableCell align="right">{row.telephone_no}</TableCell>*/}
                                {/*<TableCell align="right">{row.address}</TableCell>*/}
                                {/*<TableCell align="right">{row.status}</TableCell>*/}

                            </TableRow>);

                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default Report;