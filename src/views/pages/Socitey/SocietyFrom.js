import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography, Grid } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
function SocietyForm() {
    const classes = useStyles();

    const [value, setValue] = React.useState('general');

    const plotTypeChangeHandler = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
    };

    return (
        <form className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Society Name:
                    </Typography>
                    <TextField variant="outlined" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Sector Number(#):
                    </Typography>
                    <TextField variant="outlined" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Plot Number(#):
                    </Typography>
                    <TextField variant="outlined" fullWidth size="small" />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Plot Size(sq.ft):
                    </Typography>
                    <TextField variant="outlined" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" className={classes.label}>
                        Plot Type:
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup row name="userRole" value={value} onChange={plotTypeChangeHandler}>
                            <FormControlLabel value="corner" control={<Radio color="primary" />} label="Corner" />
                            <FormControlLabel value="general" control={<Radio color="primary" />} label="General" />
                            <FormControlLabel value="comercial" control={<Radio color="primary" />} label="Comercial" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography variant="h6" className={classes.label}>
                        Description:
                    </Typography>
                    <TextField multiline rows={4} rowsMax={6} variant="outlined" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h6" className={classes.label}>
                        Sector Map:
                    </Typography>
                    <div className={classes.gallery}>
                        <input className="filebtn" type="file" id="myfile" name="myfile" />
                        {/* <div>
              <CloudUploadIcon fontSize="large" />
              <Typography variant="body1">place your images here</Typography>
            </div> */}
                    </div>
                </Grid>
                <Grid item>
                    <Button size="large" variant="contained" color="primary" startIcon={<SendIcon />}>
                        Send
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default SocietyForm;
