import React, { useState, useEffect, Fragment,useRef ,forwardRef } from 'react';
import {ReactToPrint,useReactToPrint} from 'react-to-print'
import { Box ,Button } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import server from '../../../server/server';
import { startLoading, stopLoading } from '../../../store/actions';
import Paginantion from './Paginantion';
import { Link } from 'react-router-dom';

const initialValues = {
    id: '',
    plotNo: '',
    remainingBalance: '',
    sectorNo: '',
    societyName: '',
    tokenAmount: '',
    type: ''
};

const SaleTokenPlot1 = forwardRef((props,ref) => {
    const [accounts, setAccounts] = useState([]);
    const [page, setPage] = useState(1);
    const [q, setQ] = useState('');
    const dispatch = useDispatch();

    const rowsPerPage = 10;
    let indexOfLastTodo = page * rowsPerPage;
    let indexOfFirstTodo = indexOfLastTodo - rowsPerPage;
    const totalUsers = accounts.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(accounts.length / rowsPerPage); i++) {
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
                const { data } = await server.get('/checkTokenofSale');
                setAccounts(data);
                dispatch(stopLoading());
            } catch (e) {
                dispatch(stopLoading());
            }
        })();
    }, [dispatch]);
    return (
        <Fragment>
            <div className="container-xl" ref={ref}>
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h2>Sale Token Plots Summary:</h2>
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
                                    {Object.keys(initialValues)
                                        .filter((i) => i.toLocaleLowerCase() !== 'id')
                                        .map((column) => {
                                            const result = column.replace(/([A-Z])/g, ' $1');
                                            const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                                            console.log(finalResult);
                                            return (
                                                <th>
                                                    {finalResult}
                                                    <i className="fa fa-sort" />
                                                </th>
                                            );
                                        })}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {search(accounts, q)
                                    .slice(indexOfFirstTodo, indexOfLastTodo)
                                    .map((row) => (
                                        <tr key={row.id}>
                                            {/* <td>{row.id}</td> */}
                                            {Object.keys(initialValues)
                                                .filter((i) => i.toLocaleLowerCase() !== 'id')
                                                .map((column) => (
                                                    <td>{row[column]}</td>
                                                ))}

                                            <td>
                                                <Link
                                                    to={`/sale-token-plot-edit/${row.id}/${row.societyName}/${row.sectorNo}/${row.plotNo}`}
                                                    className="edit-btn"
                                                >
                                                    <i className="material-icons"></i>
                                                </Link>
                                            </td>
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


const SaleTokenPlot = () => {
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
        <SaleTokenPlot1 ref={componentRef} />
      </div>
    );
  };
export default SaleTokenPlot;
