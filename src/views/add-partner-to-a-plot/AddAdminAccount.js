import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
    Paper,
    TableContainer,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => {
    return {
        root: {
            '& .MuiAccordionSummary-root': {
                background: '#42a5f5'
            },
            '& .MuiAccordionDetails-root': {
                background: '#f5f5f5'
            }
        },

        select: {
            [theme.breakpoints.down('sm')]: {
                minWidth: 100
            },
            minWidth: 200,

            background: 'rgb(237 231 246)',
            color: deepPurple[500],
            fontWeight: 200,
            borderStyle: 'none',
            borderWidth: 2,
            borderRadius: 12,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 14,
            paddingBottom: 15,
            boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
            '&:focus': {
                borderRadius: 12,
                background: 'rgb(237 231 246)',
                borderColor: deepPurple[100]
            }
        },
        icon: {
            color: deepPurple[300],
            right: 12,
            position: 'absolute',
            userSelect: 'none',
            pointerEvents: 'none'
        },
        paper: {
            borderRadius: 12,
            marginTop: 8
        },
        list: {
            paddingTop: 0,
            paddingBottom: 0,
            background: 'white',
            '& li': {
                fontWeight: 200,
                paddingTop: 12,
                paddingBottom: 12
            },
            '& li:hover': {
                background: deepPurple[100]
            },
            '& li.Mui-selected': {
                color: 'white',
                background: deepPurple[400]
            },
            '& li.Mui-selected:hover': {
                background: deepPurple[500]
            }
        }
    };
});

function AdminAcord({ adminData, admin, setAdmin, adminAmount, setAdminAmount }) {
    const classes = useStyles();

    const handleChange = (event) => {
        setAdmin(event.target.value);
    };

    const menuProps = {
        classes: {
            paper: classes.paper,
            list: classes.list
        },
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
        },
        getContentAnchorEl: null
    };

    return (
        <div className={classes.root}>
            <div style={{ margin: '20px' }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" key="select-admin">
                                    Select Admin
                                </TableCell>
                                <TableCell align="left" key="invest-amount">
                                    Amount in Account
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
                                        <InputLabel htmlFor="my-input">Select Admin</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            disableUnderline
                                            classes={{ root: classes.select }}
                                            MenuProps={menuProps}
                                            value={admin}
                                            onChange={handleChange}
                                        >
                                            {adminData.map((item) => {
                                                return <MenuItem value={item}>{item.name}</MenuItem>;
                                            })}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="left" key="invest-amount">
                                    {admin.amountToInvest}
                                </TableCell>
                                <TableCell align="left">
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        value={adminAmount}
                                        label="Admin Amount"
                                        disableAnimation
                                        onChange={(e) => setAdminAmount(e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default AdminAcord;
