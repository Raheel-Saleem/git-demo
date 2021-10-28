import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputField from '../FormFields/InputField';


export default function AccoutForm(props) {
    const {
        formField: { accName, bankName, accNo, amountToInvest, amountInCash }
    } = props;
    return (
        <React.Fragment>
            <Typography variant="h3" sx={{ my: 2 }}>
                Account Information:
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <InputField name={accName.name} label={accName.label} fullWidth variant="outlined" size="small" type="text" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField name={bankName.name} label={bankName.label} fullWidth variant="outlined" size="small" type="text" />
                </Grid>
                <Grid item xs={12}>
                    <InputField name={accNo.name} label={accNo.label} fullWidth variant="outlined" size="small" type="text" />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name={amountToInvest.name}
                        label={amountToInvest.label}
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name={amountInCash.name}
                        label={amountInCash.label}
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
