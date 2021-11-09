import React from 'react';
import './AddPlot.css';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { startLoading, stopLoading } from '../../../../store/actions';
import swal from 'sweetalert';
import server from '../../../../server/server';

const initialValues = {
    societyName: '',
    plotNo: '',
    plotOwnerName: '',
    phoneNo: '',
    streetLocation: '',
    categories: '',
    totalStories: '',
    plotSqFeet: 0,
    totalPlotSize: '',
    ratePerSqFeet: 0,
    pay: 0,
    structure: '',
    material: false,
    sector: ''
};

const submitFormValues = async (dispatch, values) => {
    try {
        dispatch(startLoading());
        await server.post('/addPlot', values);
        dispatch(stopLoading());
        swal('Success!', 'Construction Plot Added Successfully  !', 'success');
    } catch (error) {
        dispatch(stopLoading());
        swal('Error!', `${error.response.data}`, 'error');

        console.log(error.response.data);
    }
};
const AddPlot = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues,
        // validationSchema,
        onSubmit: (values, onSubmitProps) => {
            let data = {
                ...values,
                material: !!values.material
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
                        <b>Construction Account</b>
                        <p>Add data to open Construction Account</p>
                    </div>
                </div>
                <div className="row align-items-center justify-content-center">
                    <div className="inner_box col-md-6 py-4">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Society Name #</b>
                                        </label>
                                        <input
                                            required
                                            {...formik.getFieldProps('societyName')}
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="account"
                                            name="societyName"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>PLot#</b>
                                        </label>
                                        <input
                                            required
                                            {...formik.getFieldProps('plotNo')}
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="name"
                                            name="plotNo"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Street Location</b>
                                        </label>
                                        <input
                                            required
                                            {...formik.getFieldProps('streetLocation')}
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="name"
                                            name="streetLocation"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="amount">
                                            <b>Category</b>
                                        </label>

                                        <select className="custom-select" name="categories" {...formik.getFieldProps('categories')}>
                                            <option selected>Category</option>
                                            <option value="commercial">Commercial</option>
                                            <option value="general">General</option>
                                            <option value="corner">Corner</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="amount">
                                            <b>Total Stories</b>
                                        </label>
                                        <select className="custom-select" name="totalStories" {...formik.getFieldProps('totalStories')}>
                                            <option selected>Total Stories</option>
                                            <option value="single">Single</option>
                                            <option value="double">Double</option>
                                            <option value="triple">Triple</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="amount">
                                            <b>Structure</b>
                                        </label>
                                        <select className="custom-select" name="structure" {...formik.getFieldProps('structure')}>
                                            <option selected>Structure</option>
                                            <option value="grey">Grey Structure</option>
                                            <option value="finshed">Finished Structure</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Measurement (sqfeet)</b>
                                        </label>
                                        <input
                                            required
                                            {...formik.getFieldProps('plotSqFeet')}
                                            type="number"
                                            className="form-control"
                                            placeholder
                                            id="account"
                                            name="plotSqFeet"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Plot Size</b>
                                        </label>
                                        <input
                                            required
                                            {...formik.getFieldProps('totalPlotSize')}
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="account"
                                            name="totalPlotSize"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Rate per sqfeet</b>
                                        </label>
                                        <input
                                            required
                                            {...formik.getFieldProps('ratePerSqFeet')}
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="name"
                                            name="ratePerSqFeet"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="amount">
                                            <b>Material</b>
                                        </label>
                                        <select className="custom-select" name="material" {...formik.getFieldProps('material')}>
                                            <option selected>Material Type</option>
                                            <option value={true}>With Material</option>
                                            <option value={false}>Without Material</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Pay</b>
                                        </label>
                                        <input
                                            required
                                            type="number"
                                            className="form-control"
                                            placeholder
                                            id="account"
                                            name="pay"
                                            {...formik.getFieldProps('pay')}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Sector No#</b>
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="name"
                                            name="sector"
                                            {...formik.getFieldProps('sector')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Plot Owner Name</b>
                                        </label>
                                        <input
                                            required
                                            {...formik.getFieldProps('plotOwnerName')}
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="account"
                                            name="plotOwnerName"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Phone# </b>
                                        </label>
                                        <input
                                            required
                                            {...formik.getFieldProps('phoneNo')}
                                            type="text"
                                            className="form-control"
                                            placeholder
                                            id="name"
                                            name="phoneNo"
                                        />
                                    </div>
                                </div>
                            </div>
                            <input type="submit" defaultValue="Submit" className="btn btn-primary" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPlot;
