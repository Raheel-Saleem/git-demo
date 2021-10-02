import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Divider, Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Cheque from './SubDetailsPayment/Cheque';
import Payorder from './SubDetailsPayment/Payorder';
import Token from './SubDetailsPayment/Token';
import OnlineTransfer from './SubDetailsPayment/OnlineTransfer';
const useStyles = makeStyles((theme) => {
    return {
        root: {
            '& .MuiAccordionSummary-root': {
                background: '#42a5f5'
            },
            '& .MuiAccordionDetails-root': {
                background: '#f5f5f5',
                margin: theme.spacing(1),
                pading: theme.spacing(1)
            }
        },
        inputField: {
            width: '70%'
        }
    };
});

const PaymentDetailsAcord = (props) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography variant="h5">Payments Details </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container mxWidth="md" spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1">Amount in Cash:</Typography>
                                <TextField size="small" variant="outlined" className={classes.inputField} placeholder="xx,xx,xxx Rs." />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" className={classes.label}>
                                    Tax Amount:
                                </Typography>
                                <TextField size="small" variant="outlined" className={classes.inputField} placeholder="xx,xx,xxx Rs." />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Cheque />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Payorder />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Token />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <OnlineTransfer />
                            </Grid>
                        </Grid>

                        {/* <div style={{ margin: "20px" }}>
            </div> */}
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
};

export default PaymentDetailsAcord;
