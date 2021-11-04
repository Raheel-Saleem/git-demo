import React from 'react';
import './AddPlot.css';
const AddPlot = () => {
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
                        <form action="#" method="post">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Society Name #</b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="account" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>PLot#</b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Street Location</b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="amount">
                                            <b>Category</b>
                                        </label>
                                        <select className="custom-select">
                                            <option selected>Category</option>
                                            <option value={1}>Commercial</option>
                                            <option value={2}>General</option>
                                            <option value={3}>Corner</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="amount">
                                            <b>Total Stories</b>
                                        </label>
                                        <select className="custom-select">
                                            <option selected>Total Stories</option>
                                            <option value={1}>Single</option>
                                            <option value={2}>Double</option>
                                            <option value={3}>Triple</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="amount">
                                            <b>Structure</b>
                                        </label>
                                        <select className="custom-select">
                                            <option selected>Structure</option>
                                            <option value={1}>Grey Structure</option>
                                            <option value={2}>Finished Structure</option>
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
                                        <input type="text" className="form-control" placeholder id="account" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Plot Size</b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="account" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Rate per sqfeet</b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="amount">
                                            <b>Material</b>
                                        </label>
                                        <select className="custom-select">
                                            <option selected>Material Type</option>
                                            <option value={1}>With Material</option>
                                            <option value={2}>Without Material</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Pay</b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="account" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Sector No#</b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="account">
                                            <b>Plot Owner Name</b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="account" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Phone# </b>
                                        </label>
                                        <input type="text" className="form-control" placeholder id="name" />
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
