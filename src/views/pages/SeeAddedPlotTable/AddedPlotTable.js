import React, { useState, useEffect, Fragment,useRef, forwardRef } from 'react';
import {ReactToPrint,useReactToPrint} from 'react-to-print'

import './AddedPlotTable.css';
import { useDispatch } from 'react-redux';
import server from '../../../server/server';
import { startLoading, stopLoading } from '../../../store/actions';
import swal from 'sweetalert';
import { Box ,Button } from '@material-ui/core';

import Paginantion from './Paginantion';
import { Chip } from '@material-ui/core';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import lightGreen from '@material-ui/core/colors/lightGreen';
import cyan from '@material-ui/core/colors/cyan';
import lime from '@material-ui/core/colors/lime';

const initialValues = {
    id: -1,
    societyname: '',
    sectorno: '',
    plotno: '',
    development: false,
    plotamount: '',
    plotownername: '',
    plottype: '',
    plotsize: ''
};

const AddedPlotTable1 =forwardRef( (props,ref) => {
    const [plots, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [opendelete, setDelete] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeletId] = useState(null);
    const [rowValues, setNewValues] = useState(initialValues);

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

    const openModal = (id) => {
        const index = plots.findIndex((user) => user.id === id);
        const selectedRowItems = plots[index];

        handleRowValues(selectedRowItems);

        setEditId(id);
        setOpen(true);
    };
    const openDeleteModal = (id) => {
        console.log('delete modal fucn exe id', id);
        setDeletId(id);
        setDelete(true);
    };
    const handleClose = () => {
        resetUpdateStates();
        resetDeleteStates();
    };
    const handleDelete = async (id) => {
        const newUsers = [...plots];

        try {
            dispatch(startLoading());
            const response = await server.delete(`deletePlot/${id}`);
            dispatch(stopLoading());

            if (response.status === 200) {
                const index = plots.findIndex((plot) => plot.id === id);

                newUsers.splice(index, 1);
                setUsers(newUsers);
                resetDeleteStates();
                swal('Success!', 'User Deleted Succesfully!', 'success');
            }
        } catch (error) {
            dispatch(stopLoading());

            swal('Error!', 'Forbidden!', 'error');
        }
    };

    const handleUpdate = async (values) => {
        const newUsers = [...plots];

        try {
            dispatch(startLoading());
            const { societyname, sectorno, plotno, ...data } = values;

            const response = await server.put(`/updatePlot`, data);
            dispatch(stopLoading());

            if (response.status === 200) {
                const index = plots.findIndex((user) => user.id === values.id);

                newUsers.splice(index, 1, values);
                setUsers(newUsers);
                resetUpdateStates();
                swal('Success!', 'User Deleted Succesfully!', 'success');
            }
        } catch (error) {
            dispatch(stopLoading());
            resetUpdateStates();
            console.log(error.response);
            swal('Error!', 'Forbidden!', 'error');
        }
    };
    const resetDeleteStates = () => {
        setDeletId(null);
        setDelete(false);
    };

    const resetUpdateStates = () => {
        setNewValues(initialValues);
        setEditId(null);
        setOpen(false);
    };

    const handleRowValues = (selectedRowItems) => {
        setNewValues((prevState) => {
            return {
                ...prevState,
                id: selectedRowItems.id,
                societyname: selectedRowItems.societyname,
                sectorno: selectedRowItems.sectorno,
                plotno: selectedRowItems.plotno,
                development: selectedRowItems.development,
                plotamount: selectedRowItems.plotamount,
                plotownername: selectedRowItems.plotownername,
                plottype: selectedRowItems.plottype,
                plotsize: selectedRowItems.plotsize
            };
        });
    };
    useEffect(() => {
        (async () => {
            try {
                dispatch(startLoading());
                const { data } = await server.get('/allplotforpurchasesummary');
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
            <EditModal open={open} close={handleClose} editRow={handleUpdate} rowValues={rowValues} />
            <DeleteModal open={opendelete} close={resetDeleteStates} deleteRow={handleDelete} deleteId={deleteId} />
            <div className="container-fluid" ref = {ref}>
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

                                    <th>Plot Size</th>
                                    <th>Plot Type</th>
                                    <th>Plot-Owner</th>
                                    <th>Plot Purchase Amount</th>

                                    <th>Development</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {search(plots, q)
                                    .slice(indexOfFirstTodo, indexOfLastTodo)
                                    .map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.societyname}</td>
                                            <td>{row.sectorno}</td>
                                            <td>{row.plotno}</td>
                                            <td>{row.plotsize + ' sq.ft'}</td>

                                            <td>
                                                <Chip
                                                    label={row.plottype.toUpperCase()}
                                                    variant="outlined"
                                                    style={{
                                                        backgroundColor:
                                                            row.plottype.toLowerCase() === 'comercial'
                                                                ? `${lightGreen[200]}`
                                                                : '' || row.plottype.toLowerCase() === 'corner'
                                                                ? `${lime[300]}`
                                                                : '' || row.plottype.toLowerCase() === 'general'
                                                                ? `${cyan[200]}`
                                                                : '',
                                                        color: 'black'
                                                    }}
                                                />
                                            </td>
                                            <td>{row.plotownername.toUpperCase()}</td>
                                            <td>{row.plotamount}</td>
                                            <td>{row.development ? 'Yes' : 'No'}</td>

                                            <td>
                                                <button
                                                    className="edit-btn"
                                                    type="button"
                                                    title="Edit"
                                                    data-toggle="tooltip"
                                                    onClick={() => openModal(row.id)}
                                                >
                                                    <i className="material-icons"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="delete-btn"
                                                    title="Delete"
                                                    data-toggle="tooltip"
                                                    onClick={() => openDeleteModal(row.id)}
                                                >
                                                    <i className="material-icons"></i>
                                                </button>
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
);});

const AddedPlotTable = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,documentTitle: "Added Plot"
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
        <AddedPlotTable1 ref={componentRef} />
      </div>
    );
  };

export default AddedPlotTable;
