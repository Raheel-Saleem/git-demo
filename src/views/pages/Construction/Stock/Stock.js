import React from 'react';
import './Stock.css';
const Stock = () => {
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
                        <form action="#" method="post">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Item Name </b>
                                        </label>
                                        <select className="custom-select">
                                            <option selected>Name</option>
                                            <option value={1}>Bricks</option>
                                            <option value={2}>Cement</option>
                                        </select>
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
                                <div className="col-md-12">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Plot Name</b>
                                        </label>
                                        <select className="custom-select">
                                            {/* <option selected>Filer</option> */}
                                            <option value={1}>House #1</option>
                                            <option value={2}>House 2</option>
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
