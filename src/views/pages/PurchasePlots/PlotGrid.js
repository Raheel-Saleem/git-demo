import { Grid } from '@material-ui/core';
import React from 'react';
import PlotCard from '../../../ui-component/controls/PlotCard';
function PlotGrid() {
    return (
        <div>
            <Grid container fixed>
                <Grid item spacing={1} xs={12} sm={6} md={6} lg={4}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PlotCard />
                    </div>
                </Grid>
                <Grid item spacing={1} xs={12} sm={6} md={6} lg={4} alignContent="cenetr" alignItems="center">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PlotCard />
                    </div>
                </Grid>
                <Grid item spacing={1} xs={12} sm={6} md={6} lg={4} alignContent="cenetr" alignItems="center">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PlotCard />
                    </div>
                </Grid>
                <Grid item spacing={1} xs={12} sm={6} md={6} lg={4} alignContent="cenetr" alignItems="center">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PlotCard />
                    </div>
                </Grid>
                <Grid item spacing={1} xs={12} sm={6} md={6} lg={4} alignContent="cenetr" alignItems="center">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PlotCard />
                    </div>
                </Grid>
                <Grid item spacing={1} xs={12} sm={6} md={6} lg={4} alignContent="cenetr" alignItems="center">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PlotCard />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default PlotGrid;
