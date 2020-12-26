import React from 'react';

import DrierItem from './DrierItem';
import RollerItem from './RollerItem';
import RollBreakerItem from './RollBreakerItem';
import Card from '../../shared/components/UIElements/Card';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';


// import './MachineList.css';

const MachineList = props => {
    if (props.drier_item.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No machines found.</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Paper elevation={8}>
                <Typography variant={"h2"} align={"center"} color={'primary'}>
                    Drier
                </Typography>
            </Paper>
            <Grid container spacing={1}>
                {props.drier_item.map((drier) => (
                    <DrierItem
                        key={drier.drier_id}
                        id={drier.drier_id}
                        image={drier.image}
                        modal={drier.modal}
                        machine_purchase_date={drier.machine_purchase_date}
                        power_info={drier.power_info}
                        onDelete={props.onDeleteDrier}
                        type={'Drier'}
                    />
                ))}

            </Grid>
            <Paper elevation={8}>
                <Typography variant={"h2"} align={"center"} color={'primary'}>
                    Roller
                </Typography>
            </Paper>
            <Grid container spacing={1}>

                {props.roll_item.map(roll_item => (
                    <RollerItem
                        key={roll_item.roller_id}
                        id={roll_item.roller_id}
                        image={roll_item.image}
                        modal={roll_item.modal}
                        machine_purchase_date={roll_item.machine_purchase_date}
                        power_info={roll_item.power_info}
                        onDelete={props.onDeleteRoller}
                        type={'Roller'}
                    />
                ))}
            </Grid>
            <Paper elevation={8}>
                <Typography variant={"h2"} align={"center"} color={'primary'}>
                    Roll Breaker
                </Typography>
            </Paper>
            <Grid container spacing={1}>
                {props.rb_items.map(rb_items => (
                    <RollBreakerItem
                        key={rb_items.roll_breaker_id}
                        id={rb_items.roll_breaker_id}
                        image={rb_items.image}
                        modal={rb_items.modal}
                        machine_purchase_date={rb_items.machine_purchase_date}
                        power_info={rb_items.power_info}
                        onDelete={props.onDeleteRB}
                        type={'Roll Breaker'}
                    />
                ))}
            </Grid>
        </React.Fragment>

    );
};

export default MachineList;
