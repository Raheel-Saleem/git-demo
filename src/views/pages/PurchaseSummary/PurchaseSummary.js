import React, { useState, useEffect, Fragment } from 'react';
import './PurchaseSummary.css';
import { useDispatch } from 'react-redux';
import server from '../../../server/server';
import { startLoading, stopLoading } from '../../../store/actions';
import swal from 'sweetalert';

import Paginantion from './Paginantion';
import { Chip } from '@material-ui/core';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import lightGreen from '@material-ui/core/colors/lightGreen';
import cyan from '@material-ui/core/colors/cyan';
import lime from '@material-ui/core/colors/lime';

const PurchaseSummary = () => {
    const [plots, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [q, setQ] = useState('');
    const dispatch = useDispatch();

    const rowsPerPage = 10;
    let indexOfLastTodo = page * rowsPerPage;
    let indexOfFirstTodo = indexOfLastTodo - rowsPerPage;
    const totalUsers = plots.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(plots.length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }
    const search = (rows, q) => {
        const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter((row) => columns.some((column) => row[column].toString().toLowerCase().indexOf(q) > -1));
    };

    useEffect(() => {
        (async () => {
            try {
                dispatch(startLoading());
                const { data } = await server.get('getAllPaymentsDetails');
                setUsers(data);
                console.log(data);
                dispatch(stopLoading());
            } catch (e) {
                dispatch(stopLoading());
            }
        })();
    }, [dispatch]);
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h2>Added Plot Details :</h2>
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
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="table-primary">
                                <tr>
                                    {/* <th>ID#</th> */}
                                    <th>Society Name</th>
                                    <th>Sector Number</th>
                                    <th>Plot Number</th>

                                    <th>Amount in Cash</th>
                                    <th>Cheque Amount</th>
                                    {/* <th>Number of Cheque</th>
                                    <th>Cheque Number</th> */}

                                    <th>PayOrder Amount</th>
                                    <th>Number of PayOrder</th>
                                    <th>PayOrder Number</th>

                                    <th>Token Amount</th>
                                    <th>Token Days</th>
                                    <th>Date</th>

                                    <th>Tax Amount</th>
                                    <th>Online Transfer</th>
                                    <th>Remaining Balence</th>
                                </tr>
                            </thead>
                            <tbody>
                                {search(plots, q)
                                    .slice(indexOfFirstTodo, indexOfLastTodo)
                                    .map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.societyName}</td>
                                            <td>{row.sectorNo}</td>
                                            <td>{row.plotNo}</td>
                                            <td>{row.amountInCash}</td>
                                            <td>{row.chequeAmount}</td>
                                            {/* <td>{row.noOfCheques}</td>
                                            <td>{row.chequeNo}</td> */}
                                            <td>{row.payorderAmount}</td>
                                            <td>{row.noOfPayOrder}</td>
                                            <td>{row.payOrderNo}</td>
                                            <td>{row.tokenAmount}</td>
                                            <td>{row.tokenDays}</td>

                                            <td>{row.tokenDate}</td>
                                            <td>{row.taxAmount}</td>
                                            <td>{row.onlineTransfer}</td>
                                            <td>{row.remaningBalance}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <div className="clearfix">
                            <div className="hint-text">
                                Showing <b> {totalUsers < 10 ? totalUsers : 10}</b> out of <b>{totalUsers}</b> entries
                            </div>
                            <Paginantion currentPage={page} pageNumbers={pageNumbers} setPage={setPage} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default PurchaseSummary;
