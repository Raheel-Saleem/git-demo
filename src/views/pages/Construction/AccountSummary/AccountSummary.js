import React, { useState, useEffect, Fragment, useRef, forwardRef } from 'react';
import { ReactToPrint, useReactToPrint } from 'react-to-print';
import { Box, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import server from '../../../../server/server';
import { startLoading, stopLoading } from '../../../../store/actions';
import swal from 'sweetalert';
import Paginantion from './Paginantion';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const initialValues = {
    id: '',
    accountNo: '',
    name: '',
    amount: ''
};

const AccountSummary1 = forwardRef((props, ref) => {
    const [conAccounts, setConAccounts] = useState([]);
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
    const totalUsers = conAccounts.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(conAccounts.length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }
    const search = (rows, q) => {
        const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter((row) => columns.some((column) => row[column].toString().toLowerCase().indexOf(q) > -1));
    };

    const openModal = (id) => {
        const index = conAccounts.findIndex((conAccount) => conAccount.id === id);
        const selectedRowItems = conAccounts[index];

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
        const newConAccounts = [...conAccounts];

        try {
            dispatch(startLoading());
            const response = await server.delete(`/deleteConstructionAccount/${id}`);
            dispatch(stopLoading());

            if (response.status === 200) {
                const index = conAccounts.findIndex((conAccount) => conAccount.id === id);

                newConAccounts.splice(index, 1);
                setConAccounts(newConAccounts);
                resetDeleteStates();
                swal('Success!', 'Record Deleted Succesfully!', 'success');
            }
        } catch (error) {
            dispatch(stopLoading());

            swal('Error!', 'Forbidden!', 'error');
        }
    };

    const handleUpdate = async (values) => {
        const newConAccounts = [...conAccounts];

        try {
            dispatch(startLoading());

            const response = await server.put(`/updateConstructionAccount`, values);
            dispatch(stopLoading());

            if (response.status === 200) {
                const index = conAccounts.findIndex((conAccount) => conAccount.id === values.id);

                newConAccounts.splice(index, 1, { ...values, amount: parseInt(values.amount) + parseInt(values.prevAmount) });
                setConAccounts(newConAccounts);
                resetUpdateStates();
                swal('Success!', 'Record Updated Succesfully!', 'success');
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
                accountNo: selectedRowItems.accountNo,
                name: selectedRowItems.name,
                amount: selectedRowItems.amount
            };
        });
    };
    useEffect(() => {
        (async () => {
            try {
                dispatch(startLoading());
                const { data } = await server.get('/getConstructionAccountData');
                setConAccounts(data);
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
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper" ref={ref}>
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h2>Construction Account Summary :</h2>
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
                                    <th>
                                        Account#
                                        <i className="fa fa-sort" />
                                    </th>
                                    <th>Name</th>
                                    <th>
                                        Amount <i className="fa fa-sort" />
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {search(conAccounts, q)
                                    .slice(indexOfFirstTodo, indexOfLastTodo)
                                    .map((row) => (
                                        <tr key={row.id}>
                                            {/* <td>{row.id}</td> */}
                                            <td>{row.accountNo}</td>
                                            <td>{row.name}</td>
                                            <td>{row.amount}</td>
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
    );
});

const AccountSummary = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'construction-account-summary'
    });

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button color="secondary" variant="contained" onClick={handlePrint} sx={{ mt: 3, ml: 1 }}>
                    Print this out!
                </Button>
            </Box>

            {/* <button onClick={handlePrint}>Print this out!</button> */}
            <AccountSummary1 ref={componentRef} />
        </div>
    );
};

export default AccountSummary;
