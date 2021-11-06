import React from 'react';
import './Account.css';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { startLoading, stopLoading } from '../../../../store/actions';
import swal from 'sweetalert';
import server from '../../../../server/server';
const initialValues = {
    accountNo: '',
    name: '',
    amount: 0
};
const validationSchema = Yup.object({
    accountNo: Yup.string().required('Required!'),
    name: Yup.string().required('Required!'),
    amount: Yup.string().required('Required!')
});

const submitFormValues = async (dispatch, values) => {
    try {
        dispatch(startLoading());
        await server.post('https://property-manag.herokuapp.com/constructionAmount', values);
        dispatch(stopLoading());
        swal('Success!', 'Construction Account Open !', 'success');
    } catch (error) {
        dispatch(stopLoading());
        swal('Error!', 'Something Went Wrong Please TryAgain!', 'error');

        console.log(error);
    }
};

const Account = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, onSubmitProps) => {
            console.log('from on submit fun', values);
            submitFormValues(dispatch, values);
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
        }
    });
    return (
        <>
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
                                    <div className="col-md-12">
                                        <div className="form-group first">
                                            <label className="input_heading" htmlFor="account">
                                                <b>Account #</b>
                                            </label>

                                            <input
                                                type="text"
                                                name="accountNo"
                                                className="form-control"
                                                placeholder
                                                id="account"
                                                {...formik.getFieldProps('accountNo')}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group first">
                                            <label className="input_heading" htmlFor="name">
                                                <b>Name</b>
                                            </label>

                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder
                                                id="name"
                                                {...formik.getFieldProps('name')}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group first">
                                            <label className="input_heading" htmlFor="amount">
                                                <b>Amount</b>
                                            </label>
                                            <input
                                                required
                                                type="number"
                                                name="amount"
                                                className="form-control"
                                                {...formik.getFieldProps('amount')}
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
        </>
    );
};

export default Account;
