import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import server from '../../../../server/server';
import { startLoading, stopLoading } from '../../../../store/actions';
import swal from 'sweetalert';
import Paginantion from './Paginantion';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const initialValues = {
    id: '',
    dateOfPurchase: '',
    itemName: '',
    paid: '',
    pay: '',
    paymentMethod: '',
    quantity: '',
    rate: '',
    remainingBalance: '',
    supplierName: '',
    totalAmount: '',
    unit: ''
};

const ProductSummary = () => {
    const [products, setProducts] = useState([]);
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
    const totalUsers = products.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }
    const search = (rows, q) => {
        const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter((row) => columns.some((column) => row[column].toString().toLowerCase().indexOf(q) > -1));
    };

    const openModal = (id) => {
        const index = products.findIndex((supplier) => supplier.id === id);
        const selectedRowItems = products[index];

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
        const newSuppliers = [...products];

        try {
            dispatch(startLoading());
            const response = await server.delete(`/deleteConstructionPurchaseProduct/${id}`);
            dispatch(stopLoading());

            if (response.status === 200) {
                const index = products.findIndex((supplier) => supplier.id === id);

                newSuppliers.splice(index, 1);
                setProducts(newSuppliers);
                resetDeleteStates();
                swal('Success!', 'Record Deleted Succesfully!', 'success');
            }
        } catch (error) {
            dispatch(stopLoading());

            swal('Error!', 'Forbidden!', 'error');
        }
    };

    const handleUpdate = async (values) => {
        const newSuppliers = [...products];

        try {
            dispatch(startLoading());

            const response = await server.put(`/updateConstructionPurchaseProduct`, values);
            dispatch(stopLoading());

            if (response.status === 200) {
                const index = products.findIndex((supplier) => supplier.id === values.id);

                newSuppliers.splice(index, 1, values);
                setProducts(newSuppliers);
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
                dateOfPurchase: selectedRowItems.dateOfPurchase,
                itemName: selectedRowItems.itemName,
                paid: selectedRowItems.paid,
                pay: selectedRowItems.pay,
                paymentMethod: selectedRowItems.paymentMethod,
                quantity: selectedRowItems.quantity,
                rate: selectedRowItems.rate,
                remainingBalance: selectedRowItems.remainingBalance,
                supplierName: selectedRowItems.supplierName,
                totalAmount: selectedRowItems.totalAmount,
                unit: selectedRowItems.unit
            };
        });
    };
    useEffect(() => {
        (async () => {
            try {
                dispatch(startLoading());
                const { data } = await server.get('/getConstructionPurchaseProducts');
                setProducts(data);
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
            <div className="">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h2>Construction Product Summary :</h2>
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
                                    {[
                                        'dateOfPurchase',
                                        'itemName',
                                        'paid',
                                        'pay',
                                        'paymentMethod',
                                        'quantity',
                                        'rate',
                                        'remainingBalance',
                                        'supplierName',
                                        'totalAmount',
                                        'unit'
                                    ].map((column) => {
                                        const result = column.replace(/([A-Z])/g, " $1");
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
                                {search(products, q)
                                    .slice(indexOfFirstTodo, indexOfLastTodo)
                                    .map((row) => (
                                        <tr key={row.id}>
                                            {/* <td>{row.id}</td> */}
                                            {[
                                                'dateOfPurchase',
                                                'itemName',
                                                'paid',
                                                'pay',
                                                'paymentMethod',
                                                'quantity',
                                                'rate',
                                                'remainingBalance',
                                                'supplierName',
                                                'totalAmount',
                                                'unit'
                                            ].map((column) =>
                                                column === 'paid' ? <td>{row[column] ? 'Yes' : 'No'}</td> : <td>{row[column]}</td>
                                            )}

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
};

export default ProductSummary;
