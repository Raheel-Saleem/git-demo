import React, { useState, useEffect, Fragment,useRef ,forwardRef } from 'react';
import {ReactToPrint,useReactToPrint} from 'react-to-print'
import { Box ,Button } from '@material-ui/core';

import './ProfitLossTable.css';
import { useDispatch } from 'react-redux';
import server from '../../../server/server';
import { startLoading, stopLoading } from '../../../store/actions';
import swal from 'sweetalert';

import { Chip } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import cyan from '@material-ui/core/colors/cyan';
import lime from '@material-ui/core/colors/lime';
import Paginantion from './Paginantion';

const initialValues = {
    actualPrice: '',
    amountInvested: 0,
    name: ' ',
    percentageInPlot: '',
    plotNo: '',
    profit_loss: 0,
    role: '',
    salePlotPrice: '',
    sectorNo: '',
    societyName: ''
};

const ProfitLossTable1 =forwardRef( (props,ref) => {
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
                const { data } = await server.get('/account/admin-partner/total-profit');
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
            <div className="container-fluid" ref={ref}>
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

                                    <th>Name</th>
                                    <th>Buy As</th>
                                    <th>Actual Amount</th>
                                    <th>Sale Amount</th>
                                    <th>Amount Invested</th>

                                    <th>Profit/Loss</th>
                                </tr>
                            </thead>
                            <tbody>
                                {search(plots, q)
                                    .slice(indexOfFirstTodo, indexOfLastTodo)
                                    .map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.societyName}</td>
                                            <td>{row.sectorNo}</td>
                                            <td>{row.plotNo}</td>
                                            <td>{row.name}</td>

                                            <td>
                                                <Chip
                                                    label={row.role.toUpperCase()}
                                                    variant="outlined"
                                                    style={{
                                                        backgroundColor:
                                                            row.role.toLowerCase() === 'partner'
                                                                ? `${lightGreen[200]}`
                                                                : '' || row.role.toLowerCase() === 'admin'
                                                                ? `${cyan[200]}`
                                                                : '',
                                                        color: 'black'
                                                    }}
                                                />
                                            </td>
                                            <td>{row.actualPrice}</td>
                                            <td>{row.salePlotPrice}</td>
                                            <td>{row.amountInvested}</td>
                                            <td>{row.profit_loss}</td>
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
})
const ProfitLossTable = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,documentTitle: "accountsummary"
      });
  
    return (
      <div>

<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={handlePrint}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                   Print this out! 
                                </Button>
                               
                            </Box>
      
{/* <button onClick={handlePrint}>Print this out!</button> */}
        <ProfitLossTable1 ref={componentRef} />
      </div>
    );
  };
export default ProfitLossTable;
