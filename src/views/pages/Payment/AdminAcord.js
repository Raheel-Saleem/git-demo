import { useState, useEffect } from "react";
import {
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  TableContainer,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { deepPurple } from "@material-ui/core/colors";

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

    select: {
      [theme.breakpoints.down("sm")]: {
        minWidth: 100,
      },
      minWidth: 200,

      background: "rgb(237 231 246)",
      color: deepPurple[500],
      fontWeight: 200,
      borderStyle: "none",
      borderWidth: 2,
      borderRadius: 12,
      paddingLeft: 24,
      paddingTop: 14,
      paddingBottom: 15,
      boxShadow: "0px 5px 8px -3px rgba(0,0,0,0.14)",
      "&:focus": {
        borderRadius: 12,
        background: "rgb(237 231 246)",
        borderColor: deepPurple[100],
      },
    },
    icon: {
      color: deepPurple[300],
      right: 12,
      position: "absolute",
      userSelect: "none",
      pointerEvents: "none",
    },
    paper: {
      borderRadius: 12,
      marginTop: 8,
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      background: "white",
      "& li": {
        fontWeight: 200,
        paddingTop: 12,
        paddingBottom: 12,
      },
      "& li:hover": {
        background: deepPurple[100],
      },
      "& li.Mui-selected": {
        color: "white",
        background: deepPurple[400],
      },
      "& li.Mui-selected:hover": {
        background: deepPurple[500],
      },
    },
  };
});

const adminList = [
  {
    id: 1,
    name: "Raheel Saleem ",
    amount: 60000,
  },
  {
    id: 2,
    name: "Badar Baig",
    amount: 50000,
  },
  {
    id: 3,
    name: "Adil Nisar",
    amount: 40000,
  },
];

function AdminAcord() {
  const classes = useStyles();
  const [admin, setAdmin] = useState(0);
  const handleChange = (event) => {
    setAdmin(event.target.value);
  };

  useEffect(() => {
    console.log(admin);
  }, [admin]);

  const menuProps = {
    classes: {
      paper: classes.paper,
      list: classes.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">Add Admin Amount</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Grid container minWidth="md">
            <Grid item xs={6} sm={4} lg={4}>
             
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.adminContent}>
                <p>amount</p>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
          </Grid> */}
          <div style={{ margin: "20px" }}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" key="select-admin">
                      Select Admin
                    </TableCell>
                    <TableCell align="left" key="acc-amount">
                      Amount In Acount
                    </TableCell>
                    <TableCell align="left" key="invest-amount">
                      Amount to Invest
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow key="inline-admin-selector">
                    <TableCell align="left">
                      <FormControl className={classes.formControl}>
                        {/* <InputLabel id="demo-simple-select-label">
                          Admin
                        </InputLabel> */}
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          disableUnderline
                          classes={{ root: classes.select }}
                          MenuProps={menuProps}
                          value={admin}
                          onChange={handleChange}
                        >
                          {adminList.map((item) => {
                            return (
                              <MenuItem value={item.id}>{item.name}</MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">600,000,000</TableCell>

                    <TableCell align="left">
                      <TextField variant="outlined" size="small" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AdminAcord;
