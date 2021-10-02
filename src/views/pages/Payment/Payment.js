import { useStyles } from "./styles.js";
import PageHeader from "../../components/PageHeader";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import {
  Divider,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AdminAcord from "./AdminAcord.js";
import AddPartnerAcord from "./AddPartnerAcord.js";
import PaymentDetailsAcord from "./PaymentDetailsAcord.js";
const obj = {
  icon: <MonetizationOnIcon fontSize="large" />,
  pageTitle: "Payment",
  pageSubtitle:
    "This form is meant to add plot amount and details for purchasing and saling i.e development ,without dev,etc",
};

const Payment = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PageHeader obj={obj} />
      <Paper variant="outlined" elevation={0}>
        <AdminAcord />
        <Divider />
        <AddPartnerAcord />
        <Divider />
        <PaymentDetailsAcord />
      </Paper>
    </div>
  );
};

export default Payment;
