import { useState, useEffect } from 'react';
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
import * as Yup from 'yup';
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

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    cnic: '',
    permission: {
        accounts: false,
        purchase: false,
        sale: false,
        supper: false
    },
    role: ''
};
const validationSchema = Yup.object({
    firstName: Yup.string().required('Required!'),
    lastName: Yup.string().required('Required!'),
    email: Yup.string().email('invalid email format').required('Required!'),
    password: Yup.string().required('Required!'),
    phone: Yup.string().required('Required!'),
    cnic: Yup.string().required('Required!')
});

export default function SignUp() {
    const classes = useStyles();

    const formik = useFormik({
        initialValues
    });

    const [value, setValue] = useState('employee');

    const roleChangeHandler = (event) => {
        setValue(event.target.value);
        // console.log(event.target.value);
    };
    console.log('signup forms permissions', formik.values.role);

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
                            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="firstName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="First Name"
                                            {...formik.getFieldProps('firstName')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Last Name"
                                            name="lastName"
                                            {...formik.getFieldProps('lastName')}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Email Address"
                                            name="email"
                                            {...formik.getFieldProps('email')}
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
                                            {...formik.getFieldProps('password')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="phone"
                                            label="Phone Number"
                                            autoFocus
                                            {...formik.getFieldProps('phone')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="cnic"
                                            label="CNIC"
                                            {...formik.getFieldProps('cnic')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Assign Permissons to User</FormLabel>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            color="primary"
                                                            checked={formik.values.permission.accounts}
                                                            name="permission.accounts"
                                                            {...formik.getFieldProps('permission.accounts')}
                                                        />
                                                    }
                                                    label="Accounts"
                                                />

                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            color="primary"
                                                            checked={formik.values.permission.sale}
                                                            name="permission.sale"
                                                            {...formik.getFieldProps('permission.sale')}
                                                        />
                                                    }
                                                    label="Sale Property"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            color="primary"
                                                            checked={formik.values.permission.purchase}
                                                            name="permission.purchase"
                                                            {...formik.getFieldProps('permission.purchase')}
                                                        />
                                                    }
                                                    label="Purchase Property"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            color="primary"
                                                            checked={formik.values.permission.supper}
                                                            name="permission.supper"
                                                            {...formik.getFieldProps('permission.supper')}
                                                        />
                                                    }
                                                    label="Supper"
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
                                                <RadioGroup name="role" value={formik.values.role} {...formik.getFieldProps('role')}>
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
