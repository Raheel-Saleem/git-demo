import { Grid } from '@material-ui/core';
import React from 'react';
import PlotCard from '../../../ui-component/controls/PlotCard';
function PlotGrid() {
    return (
        <div>
            <Grid container fixed>
                <Grid item spacing={3} xs={12} sm={6} md={4}>
                    <PlotCard />
                </Grid>
                <Grid item spacing={3} xs={12} sm={6} md={4}>
                    <PlotCard />
                </Grid>
                <Grid item spacing={3} xs={12} sm={6} md={4}>
                    <PlotCard />
                </Grid>
                <Grid item spacing={3} xs={12} sm={6} md={4}>
                    <PlotCard />
                </Grid>
                <Grid item spacing={3} xs={12} sm={6} md={4}>
                    <PlotCard />
                </Grid>
                <Grid item spacing={3} xs={12} sm={6} md={4}>
                    <PlotCard />
                </Grid>
            </Grid>
        </div>
    );
}

export default PlotGrid;
