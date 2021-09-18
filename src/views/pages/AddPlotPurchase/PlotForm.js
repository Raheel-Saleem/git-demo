import { FormControl, Grid, TextField, Typography, FormControlLabel } from '@material-ui/core';
import { Button, RadioGroup, Radio } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/styles';

import React from 'react';
const useStyles = makeStyles((theme) => {
    return {
        root: {
            margin: theme.spacing(1),
            '& .MuiFormControl-fullWidth': {
                width: '80%'
            }
        },
        label: {
            width: '80%',
            marginBottom: 5,
            paddingLeft: 5
        },
        gallery: {
            width: '80%',
            height: 150,
            border: '3px solid ',
            borderColor: '#d8d8d8',
            borderRadius: '6px',
            marginTop: 10,
            '&:hover': {
                outline: `3px dashed ${theme.palette.primary.main}`
            },
            '& .filebtn': {
                width: '100%',
                height: '150px',
                opacity: 0
            },
            '& .MuiSvgIcon-fontSizeLarge': {
                fontSize: '4.1875rem',
                opacity: 0.3
            }
        }
    };
});
function PlotForm() {
    const classes = useStyles();

    const [value, setValue] = React.useState('general');

    const devTypeChangeHandler = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
    };

    return (
        <form className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Plot Owner Name:
                    </Typography>
                    <TextField variant="outlined" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Plot Ammount(Rs.):
                    </Typography>
                    <TextField variant="outlined" fullWidth size="small" placeholder="x,xx,xxxRs." />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" className={classes.label}>
                        Select Type:
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup name="plotdevtype" value={value} onChange={devTypeChangeHandler}>
                            <FormControlLabel value="true" control={<Radio color="primary" />} label="With Development" />
                            <FormControlLabel value="false" control={<Radio color="primary" />} label="Without Development" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography variant="h6" className={classes.label}>
                        Description:
                    </Typography>
                    <TextField multiline rows={4} rowsMax={6} variant="outlined" fullWidth size="small" />
                </Grid>
                <Grid item fixed>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button size="large" variant="contained" color="primary" startIcon={<SendIcon />}>
                            Send
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

export default PlotForm;
