import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';
import InputField from '../FormFields/InputField';
const useStyles = makeStyles((theme) => {
    return {
        inputbg: {
            backgroundColor: theme.palette.primary.light
        }
    };
});

export default function Cheque(props) {
    const {
        formField: { chequeAmount, noOfCheques, chequeNo, chequeDescription, amountInCash }
    } = props;
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography variant="h3" sx={{ my: 2 }}>
                Cheque Info:
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <InputField
                        name={chequeAmount.name}
                        label={chequeAmount.label}
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField name={noOfCheques.name} label={noOfCheques.label} fullWidth variant="outlined" size="small" type="number" />
                </Grid>
                <Grid item xs={12}>
                    <InputField name={chequeNo.name} label={chequeNo.label} fullWidth variant="outlined" size="small" type="text" />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name={chequeDescription.name}
                        label={chequeDescription.label}
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="text"
                        multiline
                        rows={3}
                        rowsMax={4}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField name={amountInCash.name} label={amountInCash.label} fullWidth variant="outlined" size="small" type="number" />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
