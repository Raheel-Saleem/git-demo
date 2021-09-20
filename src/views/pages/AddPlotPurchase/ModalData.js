import React from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DoneAllIcon from '@material-ui/icons/DoneAll';
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

export default function CustomizedTables() {
    const classes = useStyles();

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
                            <StyledTableCell align="center">{'Sabsazar'}</StyledTableCell>

                            <StyledTableCell align="left" className={classes.subheader}>
                                {'Sector Number'}
                            </StyledTableCell>
                            <StyledTableCell align="center">{'D-Block'}</StyledTableCell>
                        </StyledTableRow>

                        {/*  ################### {2nd Row}##################### */}

                        <StyledTableRow key={'Plot Number'}>
                            <StyledTableCell align="left" className={classes.subheader}>
                                {'Plot Number'}
                            </StyledTableCell>
                            <StyledTableCell align="center">{'431'}</StyledTableCell>

                            <StyledTableCell align="left" className={classes.subheader}>
                                {'Plot Owner'}
                            </StyledTableCell>
                            <StyledTableCell align="center">{'Raheel'}</StyledTableCell>
                        </StyledTableRow>

                        {/*  ################### {3rd Row}##################### */}

                        <StyledTableRow key={'Plot Amont'}>
                            <StyledTableCell align="left" className={classes.subheader}>
                                {'Plot Amount'}
                            </StyledTableCell>
                            <StyledTableCell align="center">{'43,00,000. Rs'}</StyledTableCell>

                            <StyledTableCell align="left" className={classes.subheader}>
                                {'Development'}
                            </StyledTableCell>
                            <StyledTableCell align="center">{'Yes'}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
                <Box component="span" className={`${classes.bottomLeftBox} ${classes.box}`}>
                    <Button variant="contained" color="primary" style={{ height: 40 }} type="submit" startIcon={<DoneAllIcon />}>
                        Okay
                    </Button>
                </Box>

                {/* <div style={{ margin: 5, display: 'flex', justify: 'spacebetwee' }}>
                    <div style={{ margin: 5, display: 'inline-block', position: 'relative' }}>
                        <Button
                            disableElevation
                            type="submit"
                            size="medium"
                            variant="contained"
                            color="primary"
                            startIcon={<CheckCircleOutlineIcon />}
                        >
                            Ok
                        </Button>
                    </div>
                </div> */}
                {/* <div className={classes.contain}>
                     <div className={'left-element'}>left</div>
                    <div className={classes.right}>
                        <Button
                            disableElevation
                            type="submit"
                            size="medium"
                            variant="contained"
                            color="primary"
                            startIcon={<CheckCircleOutlineIcon />}
                        >
                            Ok
                        </Button>
                    </div>
                </div> */}
            </TableContainer>
        </div>
    );
}
