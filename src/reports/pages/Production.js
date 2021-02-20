import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Report from "../components/Report";

const Production = () => {
    return (
        <Grid container spacing={2}>
            <Grid item md>
                <Typography align={'center'} variant={'h2'}>Production</Typography>
            </Grid>
        </Grid>

    );
};

export default Production;
