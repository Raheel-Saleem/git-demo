import { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PlotGrid from './PlotGrid';
import server from '../../../server/server';
import { startLoading, stopLoading } from '../../../store/actions';
import PlotFilters from './PlotFilters';
import { Box } from '@material-ui/system';
import NoPlot from '../../No_Plot_Found/NoPlot';
import Divider from '@material-ui/core/Divider';
function PurchaseProperty() {
    const dispatch = useDispatch();
    const [plots, setPlots] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('plot');

    useEffect(() => {
        (async () => {
            try {
                dispatch(startLoading());
                if (param && param === 'sell') {
                    const { data } = await server.get('/getplotsforsaleppt');
                    setPlots(data);
                }
                if ((param && param === 'buy') || !param) {
                    const { data } = await server.get('/getallpptdata');
                    setPlots(data);
                }
                dispatch(stopLoading());
            } catch (e) {
                dispatch(stopLoading());
            }
        })();
    }, [param, dispatch]);

    return (
        <Fragment>
            <PlotFilters plots={plots} setPlots={setPlots} />
            <Box sx={{ mx: 4, my: 2 }}>
                <Divider variant="fullWidth" style={{ borderColor: '#a09595' }} />
            </Box>
            {(plots.length === 0 && <NoPlot />) || <PlotGrid plots={plots} />}
        </Fragment>
    );
}
export default PurchaseProperty;
