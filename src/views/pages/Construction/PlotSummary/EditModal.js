import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import { Fade } from '@material-ui/core';
import { useFormik } from 'formik';

import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

const initialValues = {
    id:'',
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

const EditModal = ({ open, close, rowValues, editRow }) => {
    const classes = useStyles();
    const [plotOwnerName, setPlotOwnerName] = useState(rowValues.plotOwnerName);
    const [societyName, setSocietyName] = useState(rowValues.societyName);
    const [plotNo, setPlotNo] = useState(rowValues.plotNo);
    const [sectorNo, setSectorNo] = useState(rowValues.sectorNo);
    const [phoneNo, setPhoneNo] = useState(rowValues.phoneNo);
    const [streetLocation, setStreetLocation] = useState(rowValues.streetLocation);
    const [categories, setCategories] = useState(rowValues.categories);
    const [totalStories, setTotalStories] = useState(rowValues.totalStories);
    const [plotSqFeet, setPlotSqFeet] = useState(rowValues.plotSqFeet);
    const [totalPlotSize, setTotalPlotSize] = useState(rowValues.totalPlotSize);
    const [ratePerSqFeet, setRatePerSqFeet] = useState(rowValues.ratePerSqFeet);
    const [pay, setPay] = useState(rowValues.pay);
    const [structure, setStructure] = useState(rowValues.structure);
    const [material, setMaterial] = useState(rowValues.material);
    const [payChangeFlag, setPayChangeFlag] = useState(false);
    const [amount, setAmount] = useState(rowValues.amount);
    const [id, setId] = useState(rowValues.id);

    useEffect(() => {
        setPlotOwnerName(rowValues.plotOwnerName);
        setSocietyName(rowValues.societyName);
        setPlotNo(rowValues.plotNo);
        setSectorNo(rowValues.sectorNo);
        setPhoneNo(rowValues.phoneNo);
        setStreetLocation(rowValues.streetLocation);
        setCategories(rowValues.categories);
        setTotalStories(rowValues.totalStories);
        setPlotSqFeet(rowValues.plotSqFeet);
        setTotalPlotSize(rowValues.totalPlotSize);
        setRatePerSqFeet(rowValues.ratePerSqFeet);
        setPay(rowValues.pay);
        setStructure(rowValues.structure);
        setMaterial(rowValues.material);
        setId(rowValues.id);
        setAmount(rowValues.amount);
    }, [rowValues]);

    const onSubmit = (e) => {
        e.preventDefault();
        let values = {
            societyName,
            plotNo,
            plotOwnerName,
            phoneNo,
            streetLocation,
            categories,
            totalStories,
            plotSqFeet,
            totalPlotSize,
            ratePerSqFeet,
            pay: payChangeFlag ? pay : 0,
            structure,
            material,
            sectorNo,
            id
        };
        console.log(values);
        editRow(values);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={() => close()}
            closeAfterTransition
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <div className="icon-box d-flex flex-row-reverse">
                        <i type="button" className="material-icons" onClick={(e) => close()}>
                            &#xE5CD;
                        </i>
                    </div>
                    <h3 className="text-center mb-3">Update Construction Plot</h3>

                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group first">
                                    <label className="input_heading" htmlFor="account">
                                        <b>Society Name #</b>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder
                                        id="account"
                                        name="societyName"
                                        value={societyName}
                                        onChange={(e) => setSocietyName(e.target.value)}
                                        disabled
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
                                        type="text"
                                        className="form-control"
                                        placeholder
                                        id="name"
                                        name="plotNo"
                                        value={plotNo}
                                        onChange={(e) => setPlotNo(e.target.value)}
                                        disabled
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
                                        type="text"
                                        className="form-control"
                                        placeholder
                                        id="name"
                                        name="streetLocation"
                                        value={streetLocation}
                                        onChange={(e) => setStreetLocation(e.target.value)}
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

                                    <select
                                        className="custom-select"
                                        name="categories"
                                        value={categories}
                                        onChange={(e) => setCategories(e.target.value)}
                                    >
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
                                    <select
                                        className="custom-select"
                                        name="totalStories"
                                        value={totalStories}
                                        onChange={(e) => setTotalStories(e.target.value)}
                                    >
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
                                    <select
                                        className="custom-select"
                                        name="structure"
                                        value={structure}
                                        onChange={(e) => setStructure(e.target.value)}
                                    >
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
                                        type="number"
                                        className="form-control"
                                        placeholder
                                        id="account"
                                        name="plotSqFeet"
                                        value={plotSqFeet}
                                        onChange={(e) => setPlotSqFeet(e.target.value)}
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
                                        type="text"
                                        className="form-control"
                                        placeholder
                                        id="account"
                                        name="totalPlotSize"
                                        value={totalPlotSize}
                                        onChange={(e) => setTotalPlotSize(e.target.value)}
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
                                        type="text"
                                        className="form-control"
                                        placeholder
                                        id="name"
                                        name="ratePerSqFeet"
                                        value={ratePerSqFeet}
                                        onChange={(e) => setRatePerSqFeet(e.target.value)}
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
                                    <select
                                        className="custom-select"
                                        name="material"
                                        value={material}
                                        onChange={(e) => setMaterial(e.target.value)}
                                    >
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
                                        value={pay}
                                        onChange={(e) => {
                                            setPayChangeFlag(true);
                                            setPay(e.target.value);
                                        }}
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
                                        value={sectorNo}
                                        onChange={(e) => setSectorNo(e.target.value)}
                                        disabled
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
                                        type="text"
                                        className="form-control"
                                        placeholder
                                        id="account"
                                        name="plotOwnerName"
                                        value={plotOwnerName}
                                        onChange={(e) => setPlotOwnerName(e.target.value)}
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
                                        type="text"
                                        className="form-control"
                                        placeholder
                                        id="name"
                                        name="phoneNo"
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <input type="submit" defaultValue="Update" className="btn btn-primary w-100" />
                    </form>
                </div>
            </Fade>
        </Modal>
    );
};

export default EditModal;
