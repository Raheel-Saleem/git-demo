import React from 'react';
import { Box, TextField, Typography, Grid } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';
import PaymentDetailsAcord from './PaymentDetailsAcord';

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
        },
        box: {
            // height: 40,
            display: 'flex',
            padding: 8
        },
        bottomLeftBox: {
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
        }
    };
});
const initialValues = {
    societyname: '',
    sectorno: '',
    plotno: '',
    plotsize: '',
    plottype: '',
    description: ''
};

const validationSchema = Yup.object({
    societyname: Yup.string().required('Required!'),
    sectorno: Yup.string().required('Required!'),
    plotno: Yup.string().required('Required!'),
    plotsize: Yup.string().required('Required!'),
    plottype: Yup.string().required('Required!')
});

function AccountForm() {
    const classes = useStyles();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, onSubmitProps) => {
            console.log(values);

            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
        }
    });

    return (
        <form className={classes.root} onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Account Title:
                    </Typography>
                    <TextField
                        name="societyname"
                        variant="outlined"
                        fullWidth
                        size="small"
                        {...formik.getFieldProps('societyname')}
                        error={formik.touched.societyname && formik.errors.societyname ? true : false}
                        helperText={formik.touched.societyname && formik.errors.societyname}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Account Number(#):
                    </Typography>
                    <TextField
                        name="sectorno"
                        variant="outlined"
                        fullWidth
                        size="small"
                        {...formik.getFieldProps('sectorno')}
                        error={formik.touched.sectorno && formik.errors.sectorno ? true : false}
                        helperText={formik.touched.sectorno && formik.errors.sectorno}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Bank Name(#):
                    </Typography>
                    <TextField
                        name="plotno"
                        variant="outlined"
                        fullWidth
                        size="small"
                        {...formik.getFieldProps('plotno')}
                        error={formik.touched.plotno && formik.errors.plotno ? true : false}
                        helperText={formik.touched.plotno && formik.errors.plotno}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Ammount To Invest:
                    </Typography>
                    <TextField
                        name="plotsize"
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="number"
                        {...formik.getFieldProps('plotsize')}
                        error={formik.touched.plotsize && formik.errors.plotsize ? true : false}
                        helperText={formik.touched.plotsize && formik.errors.plotsize}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography variant="h6" className={classes.label}>
                        Description:
                    </Typography>
                    <TextField
                        name="description"
                        multiline
                        rows={4}
                        rowsMax={6}
                        variant="outlined"
                        fullWidth
                        size="small"
                        xs={12}
                        {...formik.getFieldProps('description')}
                        error={formik.touched.description && formik.errors.description ? true : false}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                </Grid>
                <Grid item sm={12} md={12}>
                    <PaymentDetailsAcord />
                </Grid>

                <Grid item xs={12}>
                    <Box component="span" className={`${classes.bottomLeftBox} ${classes.box}`}>
                        <Button variant="contained" color="primary" style={{ height: 40 }} type="submit" startIcon={<SendIcon />}>
                            Send
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
}

export default AccountForm;
