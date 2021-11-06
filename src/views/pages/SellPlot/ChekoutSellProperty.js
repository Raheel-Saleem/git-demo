import { Box, Button, Container, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import server from '../../../server/server';
import { startLoading, stopLoading } from '../../../store/actions';
import accountFormModel from './FormModel/accountFormModel';
import formInitialValues from './FormModel/formInitialValues';
import validationSchem from './FormModel/validationSchema';
import Cheque from './Forms/Cheque';
import OnlineTranser from './Forms/OnlineTransfer';
import PayOrder from './Forms/PayOrder';
import Review from './Review';
import TokenInformation from "./Token";

const steps = ['Cheque ', "Token Information", 'Pay Order', 'Online Transfer', 'Review your order'];

const { formId, formField } = accountFormModel;

export default function Checkout() {
  const dispatch = useDispatch();
  const history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  let { societyName, sectorNo, plotNo } = useParams();
  const [activeStep, setActiveStep] = useState(0);

  const [skipped, setSkipped] = useState(new Set());
  const currentValidationSchema = validationSchem[activeStep];


  const isLastStep = activeStep === steps.length - 1;


  const isStepOptional = (step) => {
    if (step => 0 || step <= 5) return true;
    else return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      values = { ...values };
      // console.log('Yo Yo Here your form values', values);
      submitForms(values);

    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      handleNext()
      setSkipped(newSkipped);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const truncateSpace = (spacedValue) => {
    const [firstWord, secondWord] = spacedValue.split("%20");
    if (!secondWord) {
      return `${firstWord}`
    } else {
      return `${firstWord} ${secondWord}`
    }
  }

  const submitForms = async (values) => {
    try {
      dispatch(startLoading());
      const sN = truncateSpace(societyName);
      const secNo = truncateSpace(sectorNo);

      let response = await server.post('/salepayments', {
        ...values, plotInfo: { societyname: sN, sectorno: secNo, plotno: plotNo },
      });

      dispatch(stopLoading());

      if (response.status === 200) {
        swal('Success!', 'Plot Added to purchase list Successfully!', 'success');
        handleNext()
      }
      if (response.status === 400) {
        swal('Error!', 'Something Went Wrong', 'error');
      }
    } catch (error) {
      dispatch(stopLoading());
      swal('Error!', 'Check Your Connection and Try again', 'error');
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Cheque formField={formField} />;
      case 1:
        return <TokenInformation formField={formField} />;
      case 2:
        return <PayOrder formField={formField} />;
      case 3:
        return <OnlineTranser formField={formField} />;
      case 4:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography variant="h2" align="center">
          Plot Payment Method
        </Typography>

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Account opens successfully.
              </Typography>
              <Typography variant="subtitle1">
                Your request is subimitted successfully ,we will send you an update when something went wrong.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  color="secondary"
                  variant="contained"
                  // onClick={(e) => history.push('/acounts/partneracc')}
                  onClick={goToPreviousPath}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Partner Table
                </Button>
                <Button variant="contained" onClick={handleReset} sx={{ mt: 3, ml: 1 }}>
                  Reset
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <Formik initialValues={formInitialValues} validationSchema={currentValidationSchema} onSubmit={handleSubmit}>

              {({ isSubmitting, setValues }) => (
                <Form id={formId}>
                  {getStepContent(activeStep, setValues)}

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
                    {isStepOptional(activeStep) && (
                      <Button color="inherit" onClick={handleSkip} sx={{ mt: 3, ml: 1 }}>
                        Skip
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      sx={{ mt: 3, ml: 1 }}
                      type="submit"
                      disable={isSubmitting}
                    >
                      {activeStep === steps.length - 1 ? 'Buy Property' : 'Next'}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          )}
        </React.Fragment>
      </Paper>
    </Container>
    // </ThemeProvider>
  );
}
