import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import server from '../../../server/server';
import { startLoading, stopLoading } from '../../../store/actions';
import swal from 'sweetalert';

import Paginantion from './Paginantion';
import { Chip } from '@material-ui/core';

import lightGreen from '@material-ui/core/colors/lightGreen';
import cyan from '@material-ui/core/colors/cyan';
import lime from '@material-ui/core/colors/lime';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TablePagination from '@material-ui/core/TablePagination';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import TableFooter from '@material-ui/core/TableFooter';
import { Link } from 'react-router-dom';
const initialValues = {
    amountInCash: '',
    chequeAmount: '',
    chequeDescription: '',
    chequeNo: '',
    id: '',
    noOfCheques: '',
    noOfPayOrder: '',
    onlineDescription: '',
    onlineTransfer: '',
    payOrderDescription: '',
    payOrderNo: '',
    payorderAmount: '',
    plotNo: '',
    profit: '',
    remaningBalance: '',
    sectorNo: '',
    societyName: '',
    taxAmount: '',
    taxDescription: '',
    tokenAmount: '',
    tokenDate: '',
    tokenDays: '',
    tokenDescription: ''
};
const useRowStyles = makeStyles((theme) => {
    return {
        root: {
            '& > *': {
                borderBottom: 'unset'
            }
        },
        head: {
            backgroundColor: '#7abaff',
            color: theme.palette.common.white
        },
        firstHead: {
            fontSize: '1rem',
            color: 'black'
        }
    };
});
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow);

const SalePlotSummary = () => {
    const [plots, setPlots] = useState([]);
    const [q, setQ] = useState('');
    const dispatch = useDispatch();
    const classes = useRowStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, plots.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const search = (rows, q) => {
        const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter((row) => columns.some((column) => row[column].toString().toLowerCase().indexOf(q) > -1));
    };

    useEffect(() => {
        (async () => {
            try {
                dispatch(startLoading());
                const { data } = await server.get('/getAllSaleDetails');
                setPlots(data);
                dispatch(stopLoading());
            } catch (e) {
                dispatch(stopLoading());
            }
        })();
    }, [dispatch]);
    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Box sx={{ m: 1 }}>
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2>Sale Plot Summary :</h2>
                            </div>
                            <div className="col-sm-4">
                                <div className="search-box">
                                    <i className="material-icons"></i>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search…"
                                        onChange={(e) => {
                                            setQ(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
                <Box sx={{ m: 1 }}>
                    <Table aria-label="collapsible table">
                        <TableHead className={classes.head}>
                            <TableRow>
                                <TableCell />
                                <TableCell align="left" className={classes.firstHead}>
                                    Society Name
                                </TableCell>
                                <TableCell align="left" className={classes.firstHead}>
                                    Sector Number
                                </TableCell>
                                <TableCell align="left" className={classes.firstHead}>
                                    Plot Number
                                </TableCell>
                                <TableCell align="left" className={classes.firstHead}>
                                    Amount in Cash
                                </TableCell>
                                <TableCell align="left" className={classes.firstHead}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0 ? search(plots, q).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : plots).map(
                                (row) => (
                                    <Row key={row.name} row={row} setQ={setQ} />
                                )
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={plots.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Box>
            </TableContainer>
        </Fragment>
    );
};

function Row(props) {
    const { row, setQ } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <StyledTableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                    {row.societyName}
                </TableCell>
                <TableCell align="left">{row.sectorNo}</TableCell>
                <TableCell align="left">{row.plotNo}</TableCell>
                <TableCell align="left">{row.amountInCash}</TableCell>

                <TableCell align="left">
                    <Link to={`/saleinvoice/${row.id}`}>
                        <button className="btn btn-primary rounded-pill shadow">Print Invoice</button>
                    </Link>
                </TableCell>
            </StyledTableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 1, paddingTop: 1 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h4" gutterBottom component="div" style={{ backgroundColor: '#d4e4f2' }}>
                                Cheque Info:
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />

                                        <TableCell align="left">Cheque Amount</TableCell>
                                        <TableCell align="left">Number of Cheque</TableCell>
                                        <TableCell align="left">Cheque Number</TableCell>
                                        <TableCell align="left">Cheque Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell />

                                        <TableCell align="left">{row.chequeAmount}</TableCell>
                                        <TableCell align="left">{row.noOfCheques}</TableCell>
                                        <TableCell align="left">{row.chequeNo}</TableCell>
                                        <TableCell align="left">{row.chequeDescription}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>

                        <Box margin={1}>
                            <Typography variant="h4" gutterBottom component="div" style={{ backgroundColor: '#d4e4f2' }}>
                                Payoder & OnlineTransfer Info :
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />

                                        <TableCell align="left">PayOrder Amount</TableCell>
                                        <TableCell align="left">Number of PayOrder</TableCell>
                                        <TableCell align="left">PayOrder Number</TableCell>
                                        <TableCell align="left">Online Transfer</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell />

                                        <TableCell align="left">{row.payorderAmount}</TableCell>
                                        <TableCell align="left">{row.noOfPayOrder}</TableCell>
                                        <TableCell align="left">{row.payOrderNo}</TableCell>
                                        <TableCell align="left">{row.onlineTransfer}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>

                        <Box margin={1}>
                            <Typography variant="h4" gutterBottom component="div" style={{ backgroundColor: '#d4e4f2' }}>
                                Token & Tax Info :
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />

                                        <TableCell align="left">Token Amount</TableCell>
                                        <TableCell align="left">Token Days</TableCell>
                                        <TableCell align="left">Token Date</TableCell>
                                        <TableCell align="left">Tax Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell />

                                        <TableCell align="left">{row.tokenAmount}</TableCell>
                                        <TableCell align="left">{row.tokenDays}</TableCell>
                                        <TableCell align="left">{new Date(row.tokenDate).toDateString()}</TableCell>
                                        <TableCell align="left">{row.taxAmount}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

export default SalePlotSummary;
