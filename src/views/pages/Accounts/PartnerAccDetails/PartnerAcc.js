import faker from 'faker';
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import server from '../../../../server/server';
import { startLoading, stopLoadig } from '../../../../store/actions';
import { useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 850
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.getContrastText(theme.palette.secondary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
}));

let Partners = [],
    STATUSES = ['Admin', 'Employee', 'Partner'];
for (let i = 0; i < 14; i++) {
    Partners[i] = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),

        status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
    };
}

let User = [];
function UserTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadPartner = async () => {
            try {
                setLoading(true);
                let response = await server.get('/getalladmins');
                // User = [...response.data];
                // User = response.data;

                // console.log('hhahah', User);
                // for (let i = 0; i < response.data.length; i++) {
                //     Partners[i] = response.data[i].map()
                // }
                Partners = response.data;
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        loadPartner();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, Partners.length - page * rowsPerPage);

    return (
        <Fragment>
            {loading ? (
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeaderCell}>Partner Info</TableCell>
                                    <TableCell className={classes.tableHeaderCell}>Cnic</TableCell>

                                    <TableCell className={classes.tableHeaderCell}>Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Partners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            <Grid container>
                                                <Grid item lg={2} style={{ paddingRight: 5 }}>
                                                    <Avatar alt={row.username} src="." className={classes.avatar} />
                                                </Grid>
                                                <Grid item lg={10}>
                                                    <Typography className={classes.name}>{row.username}</Typography>
                                                    <Typography color="textSecondary" variant="body2">
                                                        {row.email}
                                                    </Typography>
                                                    <Typography color="textSecondary" variant="body2">
                                                        {row.phoneno}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="body2">
                                                {row.cnic}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/acounts/open/${row.id}`}>
                                                <Typography variant="body1">Add Account Details</Typography>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15]}
                                    component="div"
                                    count={Partners.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </Fragment>
    );
}

export default UserTable;
