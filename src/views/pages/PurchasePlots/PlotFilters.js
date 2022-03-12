import React, { useState, useEffect } from 'react';
import { Paper, Stack } from '@material-ui/core';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import swal from 'sweetalert';

import AsyncSelector from '../../../ui-component/controls/AsyncSelector';
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

const PlotSelectors = ({ setPlots, plots }) => {
    const classes = useStyles();
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('plot');

    const [societyname, setSociety] = useState(null);
    const [societyData, setSocietyData] = useState([]);

    const [sectorno, setSector] = useState(null);
    const [sectorData, setSectorData] = useState([]);

    const resetSelector = () => {
        setSociety(null);
        setSector(null);
    };

    // Load All Society Names
    useEffect(() => {
        const loadSocities = async () => {
            if (param && param === 'buy') {
                const { data } = await server.get('/getsocietiesnameforppt');
                setSocietyData(data);
            }
            if (param && param === 'sell') {
                const { data } = await server.get('/getsocietiesnameforsaleppt');
                setSocietyData(data);
            }
        };
        loadSocities();
    }, [param]);

    //******* Load All Setor Number Against Selected Society***********

    useEffect(() => {
        const loadSectors = async () => {
            try {
                if (societyname) {
                    if (param && param === 'buy') {
                        const response = await server.post('/getsectorsforppt', { societyname });
                        setSectorData(response.data);
                    }
                    if (param && param === 'sell') {
                        const { data } = await server.post('/getsectorsforsaleppt', { societyname });
                        setSectorData(data);
                    }
                }
            } catch (error) {
                console.log(error.data);
            }
        };
        loadSectors();
    }, [societyname, param]);

    const handleSociety = (value) => {
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

    const handleSearch = async () => {
        try {
            if (societyname && !sectorno && param && param === 'sell') {
                const { data } = await server.get(`/saleInfoAgainstSocietyName/${societyname}`);
                setPlots(data);
            }

            if (societyname && sectorno && param && param === 'sell') {
                const { data } = await server.get(`/saleInfoAgainstSocietyNameSectorNo/${societyname}/${sectorno}`);
                setPlots(data);
            }

            if (societyname && !sectorno) {
                const { data } = await server.get(`/infoAgainstSocietyName/${societyname}`);
                setPlots(data);
            } else {
                const { data } = await server.get(`/infoAgainstSocietyNameSectorNo/${societyname}/${sectorno}`);
                setPlots(data);
            }
        } catch (e) {
            swal('Opps!', 'Something went wrong. Please! check your connection', 'error');
        }
    };

    return (
        <div className={classes.root}>
            <Paper elevation={0}>
                <Grid container fixed spacing={1} justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.itemSpacing}>
                        <AsyncSelector data={societyData} label={'Society Name'} onSelectedValue={handleSociety} value={societyname} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.itemSpacing}>
                        <AsyncSelector data={sectorData} label={'Sector Number'} onSelectedValue={handleSector} value={sectorno} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.itemSpacing}>
                        <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="flex-end">
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ height: 40, marginBottom: 10, marginRight: 10 }}
                                type="submit"
                                onClick={() => {
                                    resetSelector();
                                }}
                            >
                                Reset
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ height: 40, marginBottom: 10, marginRight: 10 }}
                                type="submit"
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default PlotSelectors;
