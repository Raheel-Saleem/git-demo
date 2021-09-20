import { Paper } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import AsyncSelector from '../../../ui-component/controls/AsyncSelector';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import server from '../../../server/server';
const useStyles = makeStyles((theme) => {
    return {
        root: {
            margin: theme.spacing(1),
            '& .MuiAutocomplete-root': {
                margin: 'auto',
                width: '80%'
            },
            '& .MuiPaper-root': {
                background: 'lavender'
            }
        },
        selector: {
            margin: 'auto',
            width: '80%',
            height: 40,
            border: '1px',
            borderRadius: '12px',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            textAlign: 'center'
        },
        space: {
            margin: 5
        },
        itemSpacing: {
            padding: 10
        }
    };
});
function PlotSelectors(props) {
    const classes = useStyles();
    const [societyname, setSociety] = useState(null);
    const [societyData, setSocietyData] = useState('');

    const [sectorno, setSector] = useState(null);
    const [sectorData, setSectorData] = useState('');

    const [plot, setPlot] = useState(null);
    const [plotData, setPlotData] = useState('');

    useEffect(() => {
        const loadSocities = async () => {
            const response = await server.get('/getsocietiesname');

            setSocietyData(response.data);
        };
        loadSocities();
    }, []);

    useEffect(() => {
        const loadSectors = async () => {
            try {
                const response = await server.post('/getsectors', { societyname });

                setSectorData(response.data);
            } catch (error) {
                console.log(error.data);
                setSectorData('Not Found');
            }
        };
        loadSectors();
    }, [societyname]);

    useEffect(() => {
        const loadPlots = async () => {
            try {
                const response = await server.post('/getplots', { sectorno, societyname });

                setPlotData(response.data);
            } catch (error) {
                console.log(error.data);
                setPlotData('Not Found');
            }
        };
        loadPlots();
    }, [societyname, sectorno]);

    // useEffect(() => {
    //     console.log('select values from scociety: ', societyname);
    //     console.log('select values from sector: ', sectorno);
    //     console.log('select values from plot: ', plot);
    // }, [societyname, sectorno, plot, societyData]);

    const handleSociety = (value) => {
        // console.log('value from handleSocity', value);

        if (value === null) {
            setSector(null);
            setPlot(null);
            setSociety(null);
        } else {
            setSociety(value);
        }
    };
    const handleSector = (value) => {
        if (value === null) {
            setSector(null);
            setPlot(null);
            setSociety(null);
        } else {
            setSector(value);
        }
    };
    const handlePlot = (value) => {
        if (value === null) {
            setSector(null);
            setPlot(null);
            setSociety(null);
        } else {
            setPlot(value);
        }
    };
    if (societyname && sectorno && plot !== null) {
        let values = { societyname, sectorno, plot };
        console.log(values);
        props.onSelecteorValues(values);
    }
    return (
        <div className={classes.root}>
            <Paper elevation={0}>
                <Grid container fixed spacing={1}>
                    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.itemSpacing}>
                        <AsyncSelector data={societyData} label={'Society Name'} onSelectedValue={handleSociety} value={societyname} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.itemSpacing}>
                        <AsyncSelector data={sectorData} label={'Sector Number'} onSelectedValue={handleSector} value={sectorno} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.itemSpacing}>
                        <AsyncSelector data={plotData} label={'Plot Number'} onSelectedValue={handlePlot} value={plot} />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default PlotSelectors;
