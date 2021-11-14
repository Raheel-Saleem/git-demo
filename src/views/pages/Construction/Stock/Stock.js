import React, { useState, useEffect } from 'react';
import './Stock.css';

import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { startLoading, stopLoading } from '../../../../store/actions';
import swal from 'sweetalert';
import server from '../../../../server/server';

const initialValues = {
    plotId: '',
    itemName: '',
    quantity: 0,
    quantityType: '',
    supplierName: ''
};

const submitFormValues = async (dispatch, values) => {
    try {
        dispatch(startLoading());
        await server.post('/materialAssigned', values);
        dispatch(stopLoading());
        swal('Success!', 'Material Assigned  Successfully !', 'success');
    } catch (error) {
        dispatch(stopLoading());
        swal('Error!', `${error.response.data}`, 'error');
    }
};

const Stock = () => {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const [plots, setPlots] = useState([]);
    const [supplier, setSuppliers] = useState([]);

    const formik = useFormik({
        initialValues,
        // validationSchema,
        onSubmit: (values, onSubmitProps) => {
            let data = {
                ...values,
                itemName: values.itemName.split(',', 1).toString()
            };
            console.log('from on submit fun', data);
            submitFormValues(dispatch, data);
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
        }
    });

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await server.get('/allItems');

                setItems([...response.data]);
            } catch (error) {
                setItems([]);
            }
        };

        const getPlots = async () => {
            try {
                const response = await server.get('/allPlot');
                setPlots([...response.data]);
            } catch (error) {
                setPlots([]);
            }
        };

        const getSuppliers = async () => {
            try {
                const response = await server.get('/getSupplierName');

                setSuppliers([...response.data]);
            } catch (error) {
                setSuppliers([]);
            }
        };
        getSuppliers();
        getItems();
        getPlots();
    }, []);

    return (
        <div className="d-lg-flex half">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="head_box col-md-6 py-4">
                        <b>Add Stock</b>
                        <p>Add Stock Material</p>
                    </div>
                </div>
                <div className="row align-items-center justify-content-center">
                    <div className="inner_box col-md-6 py-4">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Item Name </b>
                                        </label>
                                        <select className="custom-select" name="itemName" {...formik.getFieldProps('itemName')}>
                                            <option selected>item</option>

                                            {items.map((item) => {
                                                return <option value={[item.name, item.rate]}>{item.name}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Quantity Type</b>
                                        </label>
                                        <select className="custom-select" name="quantityType" {...formik.getFieldProps('quantityType')}>
                                            {/* <option selected>Filer</option> */}

                                            <option value="sq.ft">sq feet</option>
                                            <option value="kg">Kg</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Quantity</b>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="name"
                                            name="quantity"
                                            {...formik.getFieldProps('quantity')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Supplier Name</b>
                                        </label>
                                        <select className="custom-select" name="supplierName" {...formik.getFieldProps('supplierName')}>
                                            <option selected>supplier</option>

                                            {supplier.map((item) => {
                                                return <option value={item.name}>{item.name}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Total Amount</b>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="name"
                                            disabled
                                            value={formik.values.quantity * parseInt(formik.values.itemName.split(',')[1])}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Plot Name</b>
                                        </label>
                                        <select className="custom-select" name="plotId" {...formik.getFieldProps('plotId')}>
                                            <option selected>plot name</option>
                                            {plots.map((item) => {
                                                return (
                                                    <option value={item.plotId}>
                                                        {item.societyName + ',' + item.sectorNo + ',' + item.plotNo}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <input
                                className="btn"
                                style={{ backgroundColor: '#0b82d8', color: 'white' }}
                                type="submit"
                                defaultValue="Submit"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stock;
