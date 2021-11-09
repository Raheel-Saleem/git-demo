import React from 'react';
import './Supplier.css';
import { useDispatch } from 'react-redux';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { startLoading, stopLoading } from '../../../../store/actions';
import swal from 'sweetalert';
import server from '../../../../server/server';

const initialValues = {
    name: '',
    cnic: '',
    contact: '',
    address: '',
    filer: false
};

const submitFormValues = async (dispatch, values) => {
    try {
        dispatch(startLoading());
        await server.post('https://property-manag.herokuapp.com/addSupplier', values);
        dispatch(stopLoading());
        swal('Success!', 'Supplier  Added Successfully  !', 'success');
    } catch (error) {
        dispatch(stopLoading());
        swal('Error!', `${error.response.data}`.toUpperCase(), 'error');

        console.log(error.response);
    }
};

const Supplier = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues,

        onSubmit: (values, onSubmitProps) => {
            let data = {
                ...values,
                filer: !!values.filer
            };
            console.log('from on submit fun', data);
            submitFormValues(dispatch, data);
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
        }
    });
    return (
        <div className="d-lg-flex half">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="head_box col-md-6 py-4">
                        <b>Add Supplier</b>
                        <p>Add Supplier's data</p>
                    </div>
                </div>
                <div className="row align-items-center justify-content-center">
                    <div className="inner_box col-md-6 py-4">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Name </b>
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="account"
                                            name="name"
                                            {...formik.getFieldProps('name')}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Contact#</b>
                                        </label>

                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="name"
                                            name="contact"
                                            {...formik.getFieldProps('contact')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Address</b>
                                        </label>

                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="name"
                                            name="address"
                                            {...formik.getFieldProps('address')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Cnic </b>
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="account"
                                            name="cnic"
                                            {...formik.getFieldProps('cnic')}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="amount">
                                            <b>Filer</b>
                                        </label>
                                        <select className="custom-select" name="filer" {...formik.getFieldProps('filer')}>
                                            {/* <option selected>Filer</option> */}
                                            <option value={true}>Filer</option>
                                            <option value={false}>Non Filer</option>
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

export default Supplier;
