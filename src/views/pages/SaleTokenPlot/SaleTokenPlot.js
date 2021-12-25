import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import server from '../../../server/server';
import { startLoading, stopLoading } from '../../../store/actions';
import swal from 'sweetalert';
import Paginantion from './Paginantion';
import EditModal from './EditModal';

const initialValues = {
    id: '',
    plotNo: '',
    remainingBalance: '',
    sectorNo: '',
    societyName: '',
    tokenAmount: '',
    type: ''
};

const SaleTokenPlot = () => {
    const [accounts, setAccounts] = useState([]);
    const [open, setOpen] = useState(false);
    const [rowValues, setNewValues] = useState(initialValues);

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

    const openModal = (id) => {
        const index = accounts.findIndex((conAccount) => conAccount.id === id);
        const selectedRowItems = accounts[index];

        handleRowValues(selectedRowItems);

        setOpen(true);
    };
    const handleClose = () => {
        resetUpdateStates();
    };

    const handleUpdate = async (values) => {
        const newAccounts = [...accounts];

        try {
            dispatch(startLoading());

            const response = await server.put(`/updateAccount`, values);
            dispatch(stopLoading());

            if (response.status === 200) {
                const index = accounts.findIndex((conAccount) => conAccount.id === values.id);

                newAccounts.splice(index, 1, values);
                setAccounts(newAccounts);
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
    const resetUpdateStates = () => {
        setNewValues(initialValues);
        setOpen(false);
    };

    const handleRowValues = (selectedRowItems) => {
        setNewValues((prevState) => {
            return {
                ...prevState,
                id: selectedRowItems.id,
                plotNo: selectedRowItems.plotNo,
                remainingBalance: selectedRowItems.remainingBalance,
                sectorNo: selectedRowItems.sectorNo,
                societyName: selectedRowItems.societyName,
                tokenAmount: selectedRowItems.tokenAmount,
                type: selectedRowItems.type
            };
        });
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
            <EditModal open={open} close={handleClose} editRow={handleUpdate} rowValues={rowValues} />
            <div className="container-xl">
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
                                                <button
                                                    className="edit-btn"
                                                    type="button"
                                                    title="Edit"
                                                    data-toggle="tooltip"
                                                    onClick={() => openModal(row.id)}
                                                >
                                                    <i className="material-icons"></i>
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
};

export default SaleTokenPlot;
