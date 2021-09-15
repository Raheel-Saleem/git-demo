import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { Divider } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useFormik } from 'formik';
import * as yup from 'yup';
const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        '& .MuiFormControl-fullWidth': {
            [theme.breakpoints.down('md')]: {
                width: '100%'
            }
            // width: '80%'
        }
    },
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    page: {
        [theme.breakpoints.down('md')]: {
            paddingLeft: 0,
            paddingRight: 0
        },
        paddingLeft: 10,
        paddingRight: 10
    }
}));

export default function SignUp() {
    const classes = useStyles();

    const [state, setState] = useState({
        account: false,
        sale: false,
        purchase: false,
        payment: false
    });
    const permissionChangeHandler = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        console.log('signUp ', [event.target.name], event.target.checked);
    };

    const [value, setValue] = useState('employee');

    const roleChangeHandler = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.page}>
                <Container component="main" maxWidth="sm">
                    <Box mx="3rem">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="fname"
                                            name="firstName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="lname"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField variant="outlined" required fullWidth label="Phone Number" autoFocus />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField variant="outlined" required fullWidth label="CNIC #" autoFocus />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Assign Permissons to User</FormLabel>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            color="primary"
                                                            checked={state.account}
                                                            onChange={permissionChangeHandler}
                                                            name="account"
                                                        />
                                                    }
                                                    label="Accounts"
                                                />

                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            color="primary"
                                                            checked={state.sale}
                                                            onChange={permissionChangeHandler}
                                                            name="sale"
                                                        />
                                                    }
                                                    label="Sale Property"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            color="primary"
                                                            checked={state.purchase}
                                                            onChange={permissionChangeHandler}
                                                            name="purchase"
                                                        />
                                                    }
                                                    label="Purchase Property"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            color="primary"
                                                            checked={state.payment}
                                                            onChange={permissionChangeHandler}
                                                            name="payment"
                                                        />
                                                    }
                                                    label="Payments"
                                                />
                                            </FormGroup>
                                            <FormHelperText>Be careful</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Paper className={classes.page}>
                                            <Typography align="center" component="h1" variant="h4">
                                                User Roles
                                            </Typography>
                                            <Divider />
                                            <FormControl component="fieldset">
                                                <RadioGroup name="userRole" value={value} onChange={roleChangeHandler}>
                                                    <FormControlLabel value="admin" control={<Radio color="primary" />} label="Admin" />
                                                    <FormControlLabel
                                                        value="employee"
                                                        control={<Radio color="primary" />}
                                                        label="Employee"
                                                    />
                                                    <FormControlLabel value="partner" control={<Radio color="primary" />} label="Partner" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                                    Sign Up
                                </Button>
                            </form>
                        </div>
                    </Box>
                </Container>
            </Paper>
        </div>
    );
}
