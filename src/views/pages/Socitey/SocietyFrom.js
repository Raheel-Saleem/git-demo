import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography, Grid } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../store/actions';
import server from '../../../server/server';

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

function SocietyForm() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, onSubmitProps) => {
            try {
                console.log(values);
                dispatch(startLoading());
                const response = await server.post('addsociety', values);
                console.log(response.data);
                dispatch(stopLoading());
                if (response.status === 200) {
                    swal('Success!', 'Society Added Succesfully!', 'success');
                }
                if (response.status === 400) {
                    swal('Error!', 'Society , Sector, or plot# in same sector may already exist!', 'error');
                }
            } catch (error) {
                dispatch(stopLoading());
                console.log(error);
                swal('Oopps!', 'Something went wrong,check your connecntion and try again', 'error');
                // if (error.response.status === 400) {
                //     swal('Oopps!', 'plot#.sector# name may  already exist!', 'error');
                // } else swal('Oopps!', 'Something went wrong,check your connecntion and try again', 'error');
            }
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
        }
    });

    return (
        <form className={classes.root} onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Society Name:
                    </Typography>
                    <TextField
                        name="societyname"
                        variant="outlined"
                        label="Name"
                        fullWidth
                        size="small"
                        {...formik.getFieldProps('societyname')}
                        error={formik.touched.societyname && formik.errors.societyname ? true : false}
                        helperText={formik.touched.societyname && formik.errors.societyname}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Sector Number(#):
                    </Typography>
                    <TextField
                        name="sectorno"
                        variant="outlined"
                        fullWidth
                        label="#"
                        size="small"
                        {...formik.getFieldProps('sectorno')}
                        error={formik.touched.sectorno && formik.errors.sectorno ? true : false}
                        helperText={formik.touched.sectorno && formik.errors.sectorno}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Plot Number(#):
                    </Typography>
                    <TextField
                        name="plotno"
                        variant="outlined"
                        label="#"
                        fullWidth
                        size="small"
                        {...formik.getFieldProps('plotno')}
                        error={formik.touched.plotno && formik.errors.plotno ? true : false}
                        helperText={formik.touched.plotno && formik.errors.plotno}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label}>
                        Plot Size(sq.ft):
                    </Typography>
                    <TextField
                        name="plotsize"
                        variant="outlined"
                        fullWidth
                        label="sq.ft"
                        size="small"
                        type="text"
                        {...formik.getFieldProps('plotsize')}
                        error={formik.touched.plotsize && formik.errors.plotsize ? true : false}
                        helperText={formik.touched.plotsize && formik.errors.plotsize}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" className={classes.label}>
                        Plot Type:
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup row name="plottype" value={formik.values.plottype} {...formik.getFieldProps('plottype')}>
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
                    <TextField
                        name="description"
                        label="Des"
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
                {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h6" className={classes.label}>
                        Sector Map:
                    </Typography>
                    <div className={classes.gallery}>
                        <input className="filebtn" type="file" id="myfile" name="myfile" />
                        <div>
              <CloudUploadIcon fontSize="large" />
              <Typography variant="body1">place your images here</Typography>
            </div>
                    </div>
                </Grid> */}
                <Grid item xs={12}>
                    <Button type="submit" size="large" variant="contained" color="primary" startIcon={<SendIcon />}>
                        Send
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default SocietyForm;
