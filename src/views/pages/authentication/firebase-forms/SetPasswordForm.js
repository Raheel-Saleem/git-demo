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

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
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
    password: '',
    passwordConfirmation: ''
};

const validationSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
    })
});

//============================|| FIREBASE - LOGIN ||============================//

const SetPasswordForm = (props, { ...others }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues,
        // validate,
        validationSchema,
        onSubmit: (values, onSubmitProps) => {
            // console.log('form submit values', values);
            // dispatch(login(values));
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
        }
    });

    return (
        <React.Fragment>
            <form onSubmit={formik.handleSubmit} noValidate>
                <Grid container maxwidth="xs" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Password "
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
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Confirm Password"
                            name="passwordConfirmation"
                            {...formik.getFieldProps('passwordConfirmation')}
                            error={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? true : false}
                            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
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
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email Code "
                            name="emailcode"
                            {...formik.getFieldProps('emailcode')}
                        />
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
                            Save New Password
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};

export default SetPasswordForm;
