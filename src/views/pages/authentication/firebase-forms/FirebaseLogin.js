import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../../store/actions';
// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
    Typography,
    TextField
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { useFormik } from 'formik';

// project imports
import useScriptRef from '../../../../hooks/useScriptRef';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Google from './../../../../assets/images/icons/social-google.svg';
import SendIcon from '@material-ui/icons/Send';

// style constant
const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    }
}));

const initialValues = {
    username: '',
    email: '',
    password: ''
};

const validationSchema = Yup.object({
    username: Yup.string().required('Required!'),
    email: Yup.string().email('invalid email format').required('Required!'),
    password: Yup.string().required('Required!')
});

//============================|| FIREBASE - LOGIN ||============================//

const FirebaseLogin = (props, { ...others }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [checked, setChecked] = React.useState(true);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues,
        onSubmit: (values, onSubmitProps) => {
            // console.log('form submit values', values);
            dispatch(login(values));
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
        },
        // validate,
        validationSchema
    });

    return (
        <React.Fragment>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider className={classes.signDivider} orientation="horizontal" />

                        <Divider className={classes.signDivider} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box
                        sx={{
                            mb: 2
                        }}
                    >
                        <Typography variant="subtitle1">Sign in with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <form onSubmit={formik.handleSubmit} noValidate>
                <Grid container maxwidth="xs" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="User Name"
                            name="username"
                            {...formik.getFieldProps('username')}
                            error={formik.touched.username && formik.errors.username ? true : false}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email "
                            name="email"
                            {...formik.getFieldProps('email')}
                            error={formik.touched.email && formik.errors.email ? true : false}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>{' '}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Password"
                            name="password"
                            {...formik.getFieldProps('password')}
                            error={formik.touched.password && formik.errors.password ? true : false}
                            helperText={formik.touched.password && formik.errors.password}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword}>
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to={props.login ? '/pages/forgot-password/forgot-password' + props.login : '#'}
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                Forgot Password?
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item sm={12}>
                        <Button
                            disableElevation
                            // disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="secondary"
                        >
                            Sign in
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};

export default FirebaseLogin;
