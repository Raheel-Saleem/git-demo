import React from 'react';
import './Supplier.css';
const Supplier = () => {
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
                        <form action="#" method="post">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Name </b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="account" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Contact#</b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Address</b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Cnic </b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="account" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="amount">
                                            <b>Filer</b>
                                        </label>
                                        <select className="custom-select">
                                            {/* <option selected>Filer</option> */}
                                            <option value={1}>Filer</option>
                                            <option value={2}>Non Filer</option>
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
