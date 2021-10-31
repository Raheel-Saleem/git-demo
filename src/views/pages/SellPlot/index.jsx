import React, { useEffect, useState } from 'react';
import { FormControl, Grid, TextField, Typography, FormControlLabel } from '@material-ui/core';
import { Button, RadioGroup, Radio } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import StoreIcon from '@material-ui/icons/Store';

import PageHeader from '../../../ui-component/PageHeader';
import server from '../../../server/server';
import { startLoading, stopLoading } from '../../../store/actions';
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
  plotownername: '',
  plotamount: '',
  development: false,
  description: ''
};

const validationSchema = Yup.object({
  plotownername: Yup.string().required('Required!'),
  plotamount: Yup.string().required('Required!')
});

const obj = {
  icon: <StoreIcon fontSize="large" />,
  pageTitle: 'Sale Plot',
  pageSubtitle: 'This form is meant to add plot data  for purchasing and selling i.e development ,without dev,etc'
};

function PlotForm({ onSetFormData, openModal }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, resetValues) => {
      //requestToApiAndTransferToAccountStepper
    }
  });

  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      <PageHeader obj={obj} />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.label}>
            Plot Owner Name:
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            name="plotownername"
            {...formik.getFieldProps('plotownername')}
            error={formik.touched.plotownername && formik.errors.plotownername ? true : false}
            helperText={formik.touched.plotownername && formik.errors.plotownername}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.label}>
            Plot Ammount(Rs.):
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            type="number"
            placeholder="x,xx,xxxRs."
            name="plotamount"
            {...formik.getFieldProps('plotamount')}
            error={formik.touched.plotamount && formik.errors.plotamount ? true : false}
            helperText={formik.touched.plotamount && formik.errors.plotamount}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Typography variant="h6" className={classes.label}>
            Select Type:
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup name="development" value={formik.values.development} {...formik.getFieldProps('development')}>
              <FormControlLabel value="true" control={<Radio color="primary" />} label="With Development" />
              <FormControlLabel value="false" control={<Radio color="primary" />} label="Without Development" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={12}>
          <Typography variant="h6" className={classes.label}>
            Description:
          </Typography>
          <TextField
            multiline
            rows={4}
            rowsMax={6}
            variant="outlined"
            fullWidth
            size="small"
            name="description"
            {...formik.getFieldProps('description')}
          />
        </Grid>
        <Grid item fixed>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" size="large" variant="contained" color="primary" startIcon={<SendIcon />}>
              Send
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}

export default PlotForm;
