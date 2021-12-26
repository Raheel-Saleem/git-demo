import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Divider, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useFormikContext } from 'formik';

const useStyles = makeStyles((theme) => {
    return {
        dividerColor: {
            borderColor: '#212121'
        },
        boxbg: {
            background: theme.palette.secondary.light
        }
    };
});

export default function Review() {
    const classes = useStyles();
    const { values: formValues } = useFormikContext();
    console.log(formValues);
    const {
        accName,
        bankName,
        accNo,
        amountToInvest,
        amountInCash,
        chequeAmount,
        noOfCheques,
        chequeNo,
        chequeDescription,
        payorderAmount,
        noOfPayOrder,
        payOrderNo,
        payorderDescription,
        onlineTransfer,

        onlineDescription
    } = formValues;
    return (
        <React.Fragment>
            <Typography variant="h3" align="center" gutterBottom>
                Account Opening Summary
            </Typography>
            <Divider classes={{ root: classes.dividerColor }} />
            <Box sx={{ m: 0.5, p: 0.5 }} className={classes.boxbg}>
                <Typography variant="h4" align="left">
                    Account Details:
                </Typography>
            </Box>
            <Box sx={{ m: 0.5, p: 0.5 }}>
                <ListItem key={'Account Title'} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={'Account Title'} inset primaryTypographyProps={{ fontWeight: '600' }} />
                    <Typography variant="body2">{accName}</Typography>
                </ListItem>
                <ListItem key={'Bank Name'} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={'Bank Name'} inset primaryTypographyProps={{ fontWeight: '600' }} />
                    <Typography variant="body2">{bankName}</Typography>
                </ListItem>
                <ListItem key={'Account Number'} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={'Account Number'} inset primaryTypographyProps={{ fontWeight: '600' }} />
                    <Typography variant="body2">{accNo}</Typography>
                </ListItem>
                <ListItem key={'Amount To Invest'} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={'Amount To Invest'} inset primaryTypographyProps={{ fontWeight: '600' }} />
                    <Typography variant="body2">{amountToInvest}</Typography>
                </ListItem>
                <ListItem key={'Amount To Invest'} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={'Amount In Cash'} inset primaryTypographyProps={{ fontWeight: '600' }} />
                    <Typography variant="body2">{amountInCash}</Typography>
                </ListItem>
            </Box>
            <Divider />
            <Box sx={{ m: 0.5, p: 0.5 }} className={classes.boxbg}>
                <Typography variant="h4" align="left">
                    Cheque Details:
                </Typography>
            </Box>
            <Box sx={{ m: 0.5, p: 0.5 }}>
                <ListItem key={'Cheque Amount'} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={'Cheque Amount'} inset primaryTypographyProps={{ fontWeight: '600' }} />
                    <Typography variant="body2">{chequeAmount}</Typography>
                </ListItem>
                <ListItem key={'Number of Cheques'} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={'Number of Cheques'} inset primaryTypographyProps={{ fontWeight: '600' }} />
                    <Typography variant="body2">{noOfCheques}</Typography>
                </ListItem>
                <ListItem key={'Cheque Number'} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={'Cheque Number'} inset primaryTypographyProps={{ fontWeight: '600' }} />
                    <Typography variant="body2">{chequeNo}</Typography>
                </ListItem>
            </Box>
            <Divider />
            <Box sx={{ m: 0.5, p: 0.5 }} className={classes.boxbg}>
                <Typography variant="h4" align="left">
                    PayOrder Details:
                </Typography>
            </Box>
            <Box sx={{ m: 0.5, p: 0.5 }}>
                <ListItem key={'PayOrder Amount'} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={'PayOrder Amount'} inset primaryTypographyProps={{ fontWeight: '600' }} />
                    <Typography variant="body2">{payorderAmount}</Typography>
                </ListItem>
                <ListItem key={'Number of Payorder'} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={'Number of Payorder'} inset primaryTypographyProps={{ fontWeight: '600' }} />
                    <Typography variant="body2">{noOfPayOrder}</Typography>
                </ListItem>
                <ListItem key={'Payorder Number'} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={'Cheque Number'} inset primaryTypographyProps={{ fontWeight: '600' }} />
                    <Typography variant="body2">{payOrderNo}</Typography>
                </ListItem>
            </Box>
            <Box sx={{ m: 0.5, p: 0.5 }}>
                <ListItem key={'Online Amount'} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={'Online Amount'} inset primaryTypographyProps={{ fontWeight: '600' }} />
                    <Typography variant="body2">{onlineTransfer}</Typography>
                </ListItem>
            </Box>
            <Divider />
        </React.Fragment>
    );
}
