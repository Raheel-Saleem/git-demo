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
    email: ''
};

const validationSchema = Yup.object({
    email: Yup.string().email('invalid email format').required('Required!')
});

//============================|| FIREBASE - LOGIN ||============================//

const ForgotForm = (props, { ...others }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

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
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box
                        sx={{
                            mb: 2
                        }}
                    >
                        <Typography variant="subtitle1">Enter Email</Typography>
                    </Box>
                </Grid>
            </Grid>

            <form onSubmit={formik.handleSubmit} noValidate>
                <Grid container maxwidth="xs" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email "
                            name="email"
                            {...formik.getFieldProps('email')}
                            error={formik.touched.email && formik.errors.email ? true : false}
                            helperText={formik.touched.email && formik.errors.email}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <MailOutlineIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
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
                            Send Me Email
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};

export default ForgotForm;
