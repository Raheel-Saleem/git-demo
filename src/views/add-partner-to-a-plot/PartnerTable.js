import React, { useState, useEffect } from 'react';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
// import { DataGrid } from '@mui/x-data-grid';
import { Autocomplete } from '@material-ui/lab';
import {
    TextField,
    Button,
    Container,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
// import { useDispatch } from 'react-redux';
// import { startLoading, stopLoading } from '../../store/actions';
// import server from '../../server/server';
// import swal from 'sweetalert';

const defaultTheme = createTheme();

const useStyles = makeStyles(
    (theme) => {
        return {
            root: {
                '& .MuiDataGrid-cell--editing': {
                    backgroundColor: 'rgb(255,215,115, 0.19)',
                    color: '#1a3e72'
                },
                '& .Mui-error': {
                    backgroundColor: `rgb(126,10,15,0.1)`,
                    color: theme.palette.error.main
                }
            }
        };
    },
    { defaultTheme }
);

export default function ConditionalValidationGrid({ partnersData, setPartnersData, selectedPartners, setSelectedPartners }) {
    const classes = useStyles();
    // const dispatch = useDispatch();
    const [partner, setPartner] = useState('');
    // const [partnersData, setPartnersData] = useState([]);
    const [amountInvest, setAmountToInvest] = useState(0);
    // const [selectedPartners, setSelectedPartners] = useState([])

    // useEffect(() => {
    //   (async () => {
    //     try {
    //       dispatch(startLoading())
    //       const { data } = await server.get('/getallpartnersforpayments');
    //       setPartnersData(data)
    //       dispatch(stopLoading())
    //     } catch (e) {
    //       dispatch(stopLoading())
    //     }
    //   })()
    // }, []);

    const handleSubmitPartnerData = () => {
        if (amountInvest > 0 && partner) {
            for (let i = 0; i < partnersData.length; i++) {
                if (partnersData[i].name === partner) {
                    let state = { amount: amountInvest, ...partnersData[i] };
                    setSelectedPartners([state, ...selectedPartners]);
                    let newPartnersData = [...partnersData];
                    newPartnersData.splice(i, 1);
                    setPartnersData(newPartnersData);
                    // setValues("userid", selectedPartners)
                }
            }
            setPartner('');
            setAmountToInvest(0);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="center" alignItems="center">
                <Box width={300}>
                    <Autocomplete
                        onChange={(_, data) => {
                            setPartner(data);
                        }}
                        value={partner}
                        id="addPartnerToPlot123"
                        options={partnersData.map((option) => option.name)}
                        allowClear
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label={'Select Partner'} placeholder={'Select Partner'} fullWidth />
                        )}
                    />
                </Box>
                <Box pl={2}>
                    <TextField
                        label="Amount To Invest"
                        name="amount"
                        type="number"
                        value={amountInvest}
                        onChange={(e) => setAmountToInvest(e.target.value)}
                    />
                </Box>
                <Box pl={2}>
                    <Button color="primary" variant="contained" onClick={handleSubmitPartnerData}>
                        Add
                    </Button>
                </Box>
            </Box>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Amount To Invest</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedPartners &&
                            selectedPartners.length > 0 &&
                            selectedPartners.map((selectedPartner) => (
                                <TableRow>
                                    <TableCell align="left">{selectedPartner.id}</TableCell>
                                    <TableCell align="left">{selectedPartner.name}</TableCell>
                                    <TableCell align="left">{selectedPartner.amount}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
