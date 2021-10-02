import React from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography, Box, Stack } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const StyledTableCell = withStyles((theme) => ({
    body: {
        color: 'black',
        fontSize: 14
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 500
    },
    container: {
        maxWidth: 500
    },
    heading: {
        margin: 5,
        padding: 5
    },
    subheader: {
        fontWeight: 500
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
});

export default function ModalData({ Close, selector, form, sendRequest, resetLower, resetUpper, resetall }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    let { sectorno, societyname, plot } = selector;
    let { plotownername, plotamount, development } = form;
    // console.log('modal line 58', sectorno, societyname, plot);

    const handleHttp = () => {
        sendRequest(selector, form, dispatch);
    };
    return (
        <div>
            <TableContainer component={Paper} className={classes.container}>
                <Typography variant="h3" className={classes.heading}>
                    Details & Description:
                </Typography>
                <Table className={classes.table} aria-label="customized table">
                    <TableBody>
                        {/*  ################### {First Row}##################### */}
                        <StyledTableRow key={'Society Name'}>
                            <StyledTableCell align="left" className={classes.subheader}>
                                {'Society Name'}
                            </StyledTableCell>
                            <StyledTableCell align="center">{societyname}</StyledTableCell>

                            <StyledTableCell align="left" className={classes.subheader}>
                                {'Sector Number'}
                            </StyledTableCell>
                            <StyledTableCell align="center">{sectorno}</StyledTableCell>
                        </StyledTableRow>

                        {/*  ################### {2nd Row}##################### */}

                        <StyledTableRow key={'Plot Number'}>
                            <StyledTableCell align="left" className={classes.subheader}>
                                {'Plot Number'}
                            </StyledTableCell>
                            <StyledTableCell align="center">{plot}</StyledTableCell>

                            <StyledTableCell align="left" className={classes.subheader}>
                                {'Plot Owner'}
                            </StyledTableCell>
                            <StyledTableCell align="center">{plotownername}</StyledTableCell>
                        </StyledTableRow>

                        {/*  ################### {3rd Row}##################### */}

                        <StyledTableRow key={'Plot Amont'}>
                            <StyledTableCell align="left" className={classes.subheader}>
                                {'Plot Amount'}
                            </StyledTableCell>
                            <StyledTableCell align="center">{plotamount}</StyledTableCell>

                            <StyledTableCell align="left" className={classes.subheader}>
                                {'Development'}
                            </StyledTableCell>
                            <StyledTableCell align="center">{development}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
                <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ height: 40, margin: 10 }}
                        type="submit"
                        startIcon={<CloseIcon />}
                        onClick={(event) => {
                            Close();
                            resetUpper();
                            resetLower();
                            resetall();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ height: 40, margin: 10 }}
                        type="submit"
                        startIcon={<DoneAllIcon />}
                        onClick={(event) => {
                            Close();
                            handleHttp();
                            resetUpper();
                            resetLower();
                            resetall();
                        }}
                    >
                        OKAY
                    </Button>
                </Stack>
            </TableContainer>
        </div>
    );
}
