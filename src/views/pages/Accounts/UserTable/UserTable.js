import React, { useState, useEffect, Fragment } from 'react';
import './UserTable.css';
import { useDispatch } from 'react-redux';
import server from '../../../../server/server';
import { startLoading, stopLoading } from '../../../../store/actions';
import swal from 'sweetalert';

import Paginantion from './Paginantion';
import { Chip } from '@material-ui/core';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import lightGreen from '@material-ui/core/colors/lightGreen';
import cyan from '@material-ui/core/colors/cyan';
import lime from '@material-ui/core/colors/lime';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [opendelete, setDelete] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeletId] = useState(null);

    const [page, setPage] = useState(1);
    const [q, setQ] = useState('');
    const dispatch = useDispatch();

    const rowsPerPage = 10;
    let indexOfLastTodo = page * rowsPerPage;
    let indexOfFirstTodo = indexOfLastTodo - rowsPerPage;
    const totalUsers = users.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }
    const search = (rows, q) => {
        const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter((row) => columns.some((column) => row[column].toString().toLowerCase().indexOf(q) > -1));
    };

    const openModal = (id) => {
        console.log('modal fucn exe id', id);
        setEditId(id);
        setOpen(true);
    };
    const openDeleteModal = (id) => {
        console.log('delete modal fucn exe id', id);
        setDeletId(id);
        setDelete(true);
    };
    const handleClose = () => {
        setOpen(false);
        setDelete(false);
    };
    const handleDelete = async (id) => {
        const newUsers = [...users];

        try {
            dispatch(startLoading());
            const response = await server.delete(`deleteUser/${id}`);
            dispatch(stopLoading());

            if (response.status === 200) {
                const index = users.findIndex((user) => user.id === id);

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

    const handleUpdate = async (values, id) => {
        const newUsers = [...users];

        try {
            dispatch(startLoading());
            const data = {
                id,
                ...values
            };
            console.log('--->>>>', data);
            const response = await server.put(`/updateUser`);
            dispatch(stopLoading());

            if (response.status === 200) {
                const index = users.findIndex((user) => user.id === id);

                newUsers.splice(index, 1, data);
                setUsers(newUsers);
                resetUpdateStates();
                swal('Success!', 'User Deleted Succesfully!', 'success');
            }
        } catch (error) {
            dispatch(stopLoading());

            swal('Error!', 'Forbidden!', 'error');
        }
    };
    const resetDeleteStates = () => {
        setDeletId(null);
        setDelete(false);
    };

    const resetUpdateStates = () => {
        setEditId(null);
        setOpen(false);
    };
    useEffect(() => {
        (async () => {
            try {
                dispatch(startLoading());
                const { data } = await server.get('/getallusers');
                setUsers(data);
                dispatch(stopLoading());
            } catch (e) {
                dispatch(stopLoading());
            }
        })();
    }, [dispatch]);
    return (
        <Fragment>
            <EditModal open={open} close={handleClose} editRow={handleUpdate} editId={editId} />
            <DeleteModal open={opendelete} close={resetDeleteStates} deleteRow={handleDelete} deleteId={deleteId} />
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h2>Users Details :</h2>
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
                                        Name
                                        <i className="fa fa-sort" />
                                    </th>
                                    <th>Email</th>
                                    <th>
                                        Cnic <i className="fa fa-sort" />
                                    </th>
                                    <th>Phone Number</th>
                                    <th>
                                        Role <i className="fa fa-sort" />
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {search(users, q)
                                    .slice(indexOfFirstTodo, indexOfLastTodo)
                                    .map((row) => (
                                        <tr key={row.id}>
                                            {/* <td>{row.id}</td> */}
                                            <td>{row.username}</td>
                                            <td>{row.email}</td>
                                            <td>{row.cnic}</td>
                                            <td>{row.phoneno}</td>

                                            <td>
                                                <Chip
                                                    label={row.role.toUpperCase()}
                                                    // color={`${partnerColor}`}
                                                    variant="outlined"
                                                    style={{
                                                        backgroundColor:
                                                            row.role.toLowerCase() === 'partner'
                                                                ? `${lightGreen[200]}`
                                                                : '' || row.role.toLowerCase() === 'employee'
                                                                ? `${lime[300]}`
                                                                : '' || row.role.toLowerCase() === 'admin'
                                                                ? `${cyan[200]}`
                                                                : '',
                                                        color: 'black'
                                                    }}
                                                />
                                            </td>
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
                                Showing <b>10</b> out of <b>{totalUsers}</b> entries
                            </div>
                            <Paginantion currentPage={page} pageNumbers={pageNumbers} setPage={setPage} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UserTable;
