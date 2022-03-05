import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import server from '../../../../server/server';
import { startLoading, stopLoading } from '../../../../store/actions';
import swal from 'sweetalert';
import Paginantion from './Paginantion';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const initialValues = {
    amount: '',
    categories: '',
    material: false,
    pay: '',
    remainingBalance: '',
    phoneNo: '',
    plotNo: '',
    plotOwnerName: '',
    plotSqFeet: '',
    ratePerSqFeet: '',
    sectorNo: '',
    societyName: '',
    status: '',
    streetLocation: '',
    structure: '',
    totalPlotSize: '',
    totalStories: '',
    id: ''
};

const PlotSummary = () => {
    const [conPlots, setConPlots] = useState([]);
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
    const totalUsers = conPlots.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(conPlots.length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }
    const search = (rows, q) => {
        const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter((row) => columns.some((column) => row[column].toString().toLowerCase().indexOf(q) > -1));
    };

    const openModal = (id) => {
        const index = conPlots.findIndex((conPlot) => conPlot.id === id);
        const selectedRowItems = conPlots[index];

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
        const newConPlots = [...conPlots];

        try {
            dispatch(startLoading());
            const response = await server.delete(`/deleteConstructionAddPlot/${id}`);
            dispatch(stopLoading());

            if (response.status === 200) {
                const index = conPlots.findIndex((conPlot) => conPlot.id === id);

                newConPlots.splice(index, 1);
                setConPlots(newConPlots);
                resetDeleteStates();
                swal('Success!', 'Record Deleted Succesfully!', 'success');
            }
        } catch (error) {
            dispatch(stopLoading());

            swal('Error!', 'Forbidden!', 'error');
        }
    };

    const handleUpdate = async (values) => {
        const newConPlots = [...conPlots];

        try {
            dispatch(startLoading());

            const response = await server.put(`/updateConstructionPlotData`, values);
            dispatch(stopLoading());

            if (response.status === 200) {
                const index = conPlots.findIndex((conPlot) => conPlot.id === values.id);

                newConPlots.splice(index, 1, response.data);
                setConPlots(newConPlots);
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
                amount: selectedRowItems.amount,
                categories: selectedRowItems.categories,
                material: selectedRowItems.material,
                pay: selectedRowItems.pay,
                remainingBalance: selectedRowItems.remainingBalance,
                phoneNo: selectedRowItems.phoneNo,
                plotNo: selectedRowItems.plotNo,
                plotOwnerName: selectedRowItems.plotOwnerName,
                plotSqFeet: selectedRowItems.plotSqFeet,
                ratePerSqFeet: selectedRowItems.ratePerSqFeet,
                sectorNo: selectedRowItems.sectorNo,
                societyName: selectedRowItems.societyName,
                status: selectedRowItems.status,
                streetLocation: selectedRowItems.streetLocation,
                structure: selectedRowItems.structure,
                totalPlotSize: selectedRowItems.totalPlotSize,
                totalStories: selectedRowItems.totalStories,
                id: selectedRowItems.id
            };
        });
    };
    useEffect(() => {
        (async () => {
            try {
                dispatch(startLoading());
                const { data } = await server.get('/getConstructionAddPlotData');
                setConPlots(data);
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
                                    <h2>Construction Plot Summary :</h2>
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
                                        'Amount',
                                        'Categories',
                                        'Material',
                                        'Pay',
                                        'Remaining Balance',
                                        'Phone',
                                        'Plot#',
                                        'Plot Owner Name',
                                        'Plot Sq Feet',
                                        'Rate Per Sq Feet',
                                        'Sector No',
                                        'Society Name',
                                        'Status',
                                        'Street Location',
                                        'Structure',
                                        'Total Plot Size',
                                        'Total Stories'
                                    ].map((column) => (
                                        <th>
                                            {column}
                                            <i className="fa fa-sort" />
                                        </th>
                                    ))}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {search(conPlots, q)
                                    .slice(indexOfFirstTodo, indexOfLastTodo)
                                    .map((row) => (
                                        <tr key={row.id}>
                                            {/* <td>{row.id}</td> */}
                                            {[
                                                'amount',
                                                'categories',
                                                'material',
                                                'pay',
                                                'remainingBalance',
                                                'phoneNo',
                                                'plotNo',
                                                'plotOwnerName',
                                                'plotSqFeet',
                                                'ratePerSqFeet',
                                                'sectorNo',
                                                'societyName',
                                                'status',
                                                'streetLocation',
                                                'structure',
                                                'totalPlotSize',
                                                'totalStories'
                                            ].map((column) =>
                                                column === 'material' ? <td>{row[column] ? 'Yes' : 'No'}</td> : <td>{row[column]}</td>
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

export default PlotSummary;
