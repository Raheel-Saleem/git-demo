import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    label: {
      padding: 5,
    },
    inputField: {
      width: "80%",
    },
  };
});

const Token = () => {
  const classes = useStyles();

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">Token</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container fixed spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" className={classes.label}>
                Token Amount:
              </Typography>
              <TextField
                size="small"
                variant="outlined"
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" className={classes.label}>
                Days for Token:
              </Typography>
              <TextField
                size="small"
                variant="outlined"
                className={classes.inputField}
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" className={classes.label}>
                Description:
              </Typography>
              <TextField
                variant="outlined"
                multiline
                rows={3}
                rowsMax={4}
                className={classes.inputField}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Token;
