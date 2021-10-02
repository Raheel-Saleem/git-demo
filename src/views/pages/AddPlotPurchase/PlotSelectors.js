import { Paper, Stack } from '@material-ui/core';
import { Grid, Typography, Box, Button } from '@material-ui/core';
import React from 'react';
import AsyncSelector from '../../../ui-component/controls/AsyncSelector';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
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
                background: theme.palette.primary.light
            }
        },

        space: {
            margin: 5
        },
        itemSpacing: {
            padding: 10
        },
        box: {
            // height: 40,
            display: 'flex',
            padding: 8
        },
        bottomLeftBox: {
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
        }
    };
});
const PlotSelectors = forwardRef(({ onSelecteorValues, resetUpper }, ref) => {
    const classes = useStyles();

    const [societyname, setSociety] = useState(null);
    const [societyData, setSocietyData] = useState('');

    const [sectorno, setSector] = useState(null);
    const [sectorData, setSectorData] = useState('');

    const [plot, setPlot] = useState(null);
    const [plotData, setPlotData] = useState('');

    // const resetSelector = (obj) => {
    //     let keys = Object.keys(obj);
    //     keys.forEach((key) => {
    //         if (Boolean(obj[key])) {
    //             obj[key] = false;
    //         } else {
    //             obj[key] = null;
    //         }
    //     });
    // };

    const resetSelector = () => {
        setSociety(null);
        setSector(null);
        setPlot(null);
    };
    useImperativeHandle(ref, () => ({
        resetSelector: () => resetSelector()
    }));
    // Load All Society Names
    useEffect(() => {
        const loadSocities = async () => {
            const response = await server.get('/getsocietiesname');

            setSocietyData(response.data);
        };
        loadSocities();
    }, []);

    //******* Load All Setor Number Against Selected Society***********

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

    // Load All Plot Against society & sectors
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

    const handleSociety = (value) => {
        console.log('value from handleSocity', value);

        if (value === null) {
            resetSelector();
        } else {
            setSociety(value);
        }
    };
    const handleSector = (value) => {
        if (value === null) {
            resetSelector();
        } else {
            setSector(value);
        }
    };
    const handlePlot = (value) => {
        if (value === null) {
            resetSelector();
        } else {
            setPlot(value);
        }
    };

    const setSelectorOnParent = () => {
        if (societyname && sectorno && plot) {
            let valuesSelected = { societyname, sectorno, plot };
            // console.log('Selected Obect', valuesSelected);
            onSelecteorValues((prevState) => {
                return {
                    ...prevState,
                    ...valuesSelected
                };
            });
        }
    };

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
                <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ height: 40, marginBottom: 10, marginRight: 10 }}
                        type="submit"
                        onClick={() => {
                            resetSelector();
                            resetUpper();
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ height: 40, marginBottom: 10, marginRight: 10 }}
                        type="submit"
                        onClick={setSelectorOnParent}
                    >
                        Save
                    </Button>
                </Stack>
                {/* <Box component="span" className={`${classes.bottomLeftBox} ${classes.box}`}>
                    <Button variant="contained" color="primary" style={{ height: 40 }} type="submit" onClick={setSelectorOnParent}>
                        Okay
                    </Button>
                </Box> */}
            </Paper>
        </div>
    );
});

export default PlotSelectors;
