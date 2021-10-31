import React, { useEffect, useState } from 'react';
import { Box, Container, Paper, Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useParams } from 'react-router-dom';
import Cheque from './Forms/Cheque';
import PayOrder from './Forms/PayOrder';
import OnlineTranser from './Forms/OnlineTransfer';
import Review from './Review';
import server from '../../server/server';
import AdminAcord from "./AddAdminAccount";
import validationSchem from './FormModel/validationSchema';
import accountFormModel from './FormModel/accountFormModel';
import formInitialValues from './FormModel/formInitialValues';
import TokenInformation from "./Token";
import PartnerTable from "./PartnerTable";
import swal from 'sweetalert';
import { startLoading, stopLoading } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const steps = ["Add Admin Information", 'Add Partner', 'Cheque ', "Token Information", 'Pay Order', 'Online Transfer', 'Review your order'];

const { formId, formField } = accountFormModel;

export default function Checkout() {
  const dispatch = useDispatch();
  const history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  let { societyName, sectorNo, plotNo } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [adminData, setAdminData] = useState([]);
  const [admin, setAdmin] = useState({
    id: "",
    amount: "",
    name: ""
  });
  const [adminAmount, setAdminAmount] = useState("");
  const [skipped, setSkipped] = useState(new Set());
  const currentValidationSchema = validationSchem[activeStep];
  //PARTNERS
  const [partnersData, setPartnersData] = useState([]);
  const [selectedPartners, setSelectedPartners] = useState([])

  const isLastStep = activeStep === steps.length - 1;

  useEffect(() => {
    (async () => {
      try {
        dispatch(startLoading())
        const { data } = await server.get('/getallpartnersforpayments');
        const { data: adminData } = await server.get("/getalladminsforpayments")
        setAdminData(adminData)
        setPartnersData(data)
        dispatch(stopLoading())
      } catch (e) {
        dispatch(stopLoading())
      }
    })()

  }, []);
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
      handleNext()
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
    const [firstWord, lastWord] = spacedValue.split("%20");
    return `${firstWord}${lastWord}`
  }
  const submitForms = async (values) => {
    try {
      dispatch(startLoading());
      let response = await server.post('/payments', {
        ...values, societyName: truncateSpace(societyName), sectorNo: truncateSpace(sectorNo), plotNo, userid: selectedPartners,
        admData: { id: admin.id, name: admin.name, amount: adminAmount }
      });
      dispatch(stopLoading());

      if (response.status === 200) {
        swal('Success!', 'Plot Added to purchase list Successfully!', 'success');
      }
      if (response.status === 400) {
        swal('Error!', 'Something Went Wrong', 'error');
      }
    } catch (error) {
      dispatch(stopLoading());
      swal('Error!', 'Check Your Connection and Try again', 'error');
    }
  };
  function getStepContent(step, setValues) {
    switch (step) {
      case 0:
        return <AdminAcord adminData={adminData} admin={admin} setAdmin={setAdmin} adminAmount={adminAmount} setAdminAmount={setAdminAmount} />
      case 1:
        return <PartnerTable setValues={setValues} partnersData={partnersData} setPartnersData={setPartnersData} selectedPartners={selectedPartners} setSelectedPartners={setSelectedPartners} />
      case 2:
        return <Cheque formField={formField} />;
      case 3:
        return <TokenInformation formField={formField} />
      case 4:
        return <PayOrder formField={formField} />
      case 5:
        return <OnlineTranser formField={formField} />;
      case 6:
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
