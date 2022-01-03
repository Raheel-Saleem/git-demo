import React, { useEffect, useState } from 'react';
import './Product.css';

import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { startLoading, stopLoading } from '../../../../store/actions';
import swal from 'sweetalert';
import server from '../../../../server/server';
import { SquareFoot } from '@material-ui/icons';

const initialValues = {
    itemName: '',
    rate: 0,
    unit: '',
    quantity: 0,
    supplierName: '',
    pay: 0,
    paymentMethod: ''
};

const submitFormValues = async (dispatch, values) => {
    try {
        dispatch(startLoading());
        await server.post('/purchaseProduct', values);
        dispatch(stopLoading());
        swal('Success!', 'Product Purchased  Successfully !', 'success');
    } catch (error) {
        dispatch(stopLoading());
        swal('Error!', 'Something Went Wrong Try Again', 'error');
    }
};
const Product = () => {
    const dispatch = useDispatch();
    const [supplier, setSupplier] = useState([]);
    const formik = useFormik({
        initialValues,
        // validationSchema,
        onSubmit: (values, onSubmitProps) => {
            console.log('from on submit fun', values);
            submitFormValues(dispatch, values);
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
        }
    });

    useEffect(() => {
        const getSuppliers = async () => {
            try {
                const response = await server.get('/getSupplierName');
                setSupplier([...response.data]);
            } catch (error) {
                console.log(error.response);
                setSupplier([]);
            }
        };
        getSuppliers();
    }, []);

    return (
        <div className="d-lg-flex half">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="head_box col-md-6 py-4">
                        <b>Purchase Product</b>
                        <p>Add purchasing product</p>
                    </div>
                </div>
                <div className="row align-items-center justify-content-center">
                    <div className="inner_box col-md-6 py-4">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Item Name </b>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="account"
                                            name="itemName"
                                            {...formik.getFieldProps('itemName')}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Rate#</b>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder
                                            id="name"
                                            name="rate"
                                            {...formik.getFieldProps('rate')}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Quantity Type</b>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="name"
                                            name="unit"
                                            {...formik.getFieldProps('unit')}
                                        />
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
                                            placeholder
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
                                        <select className="custom-select" {...formik.getFieldProps('supplierName')}>
                                            <option value="">{''}</option>
                                            {supplier.map((s) => {
                                                return <option value={s.name}>{s.name}</option>;
                                            })}

                                            {/* <option value="">Hamza Materials </option>
                                            <option value={2}>Ali Builders</option> */}
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
                                            value={formik.values.quantity * formik.values.rate}
                                            className="form-control"
                                            disabled
                                            id="name"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Payment Method </b>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            name="paymentMethod"
                                            {...formik.getFieldProps('paymentMethod')}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="amount">
                                            <b>Pay</b>
                                        </label>
                                        <input type="number" className="form-control" name="pay" {...formik.getFieldProps('pay')} />
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

export default Product;
