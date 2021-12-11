import { Grid } from '@material-ui/core';

import PlotCard from '../../../ui-component/controls/PlotCard';

function PlotGrid({ plots }) {
    return (
        <div>
            <Grid container fixed>
                {plots &&
                    plots.map((plot) => (
                        <Grid item spacing={1} xs={12} sm={6} md={6} lg={4}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <PlotCard plot={plot} />
                            </div>
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
}

export default PlotGrid;
