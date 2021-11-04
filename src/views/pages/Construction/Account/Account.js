import React from 'react';
import './Account.css';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    accountNumber: '',
    name: '',
    email: '',
    amount: 0
};

const Account = () => {
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
                            <form action="#" method="post">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group first">
                                            <label className="input_heading" htmlFor="account">
                                                <b>Account #</b>
                                            </label>
                                            <input type="text" className="form-control" placeholder id="account" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group first">
                                            <label className="input_heading" htmlFor="name">
                                                <b>Name</b>
                                            </label>
                                            <input type="text" className="form-control" placeholder id="name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group first">
                                            <label className="input_heading" htmlFor="amount">
                                                <b>Amount</b>
                                            </label>
                                            <input type="text" className="form-control" placeholder id="email" />
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
