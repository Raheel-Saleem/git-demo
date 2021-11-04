import React from 'react';
import './Product.css';
const Product = () => {
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
                        <form action="#" method="post">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Item Name </b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="account" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Rate#</b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="name" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Quantity Type</b>
                                        </label>
                                        <select className="custom-select">
                                            {/* <option selected>Filer</option> */}
                                            <option value={1}>Unit</option>
                                            <option value={2}>sq feet</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Quantity</b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Supplier Name</b>
                                        </label>
                                        <select className="custom-select">
                                            {/* <option selected>Filer</option> */}
                                            <option value={1}>Hamza Materials </option>
                                            <option value={2}>Ali Builders</option>
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
                                        <input type="text" className="form-control" placeholder id="name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Payment Method </b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="account" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="amount">
                                            <b>Payment Type</b>
                                        </label>
                                        <select className="custom-select">
                                            {/* <option selected>Filer</option> */}
                                            <option value={1}>Paid</option>
                                            <option value={2}>Non-Paid</option>
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

export default Product;
