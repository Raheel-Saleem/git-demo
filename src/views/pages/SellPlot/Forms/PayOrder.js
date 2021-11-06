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

export default function PayOrder(props) {
    const {
        formField: { payorderAmount, noOfPayOrder, payOrderNo, payorderDescription }
    } = props;
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography variant="h3" sx={{ my: 2 }}>
                Pay Order Info:
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <InputField
                        name={payorderAmount.name}
                        label={payorderAmount.label}
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField
                        name={noOfPayOrder.name}
                        label={noOfPayOrder.label}
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                    />
                </Grid>

                <Grid item xs={12}>
                    <InputField name={payOrderNo.name} label={payOrderNo.label} fullWidth variant="outlined" size="small" type="number" />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name={payorderDescription.name}
                        label={payorderDescription.label}
                        fullWidth
                        variant="outlined"
                        size="small"
                        multiline
                        rows={3}
                        rowsMax={4}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
