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

export default function OnlineTransfer(props) {
    const {
        formField: { onlineTransfer, onlineDescription }
    } = props;
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography variant="h3" sx={{ my: 2 }}>
                Online Transer Info:
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <InputField
                        name={onlineTransfer.name}
                        label={onlineTransfer.label}
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name={onlineDescription.name}
                        label={onlineDescription.label}
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="text"
                        multiline
                        rows={3}
                        rowsMax={4}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
