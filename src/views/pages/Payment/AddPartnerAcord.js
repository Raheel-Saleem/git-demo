import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import AddPartnerTable from "../../components/MaterialTable/Table";
import {
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiAccordionSummary-root": {
        background: "#42a5f5",
      },
      "& .MuiAccordionDetails-root": {
        background: "#f5f5f5",
      },
    },
  };
});

function AddPartnerAcord() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">Add Partners </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ margin: "20px" }}>
            <AddPartnerTable />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AddPartnerAcord;
