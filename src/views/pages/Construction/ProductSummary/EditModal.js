import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import { Fade } from '@material-ui/core';
import { useFormik } from 'formik';

import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik';
import server from '../../../../server/server';

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
    id: '',
    dateOfPurchase: '',
    itemName: '',
    paid: '',
    pay: '',
    paymentMethod: '',
    quantity: '',
    rate: '',
    remainingBalance: '',
    supplierName: '',
    totalAmount: '',
    unit: ''
};

const EditModal = ({ open, close, rowValues, editRow }) => {
    const classes = useStyles();
    const [id, setId] = useState('');
    const [dateOfPurchase, setDateOfPurchase] = useState('');
    const [itemName, setItemName] = useState('');
    const [paid, setPaid] = useState('');
    const [pay, setPay] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [quantity, setQuantity] = useState('');
    const [rate, setRate] = useState('');
    const [remainingBalance, setRemainingBalance] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [supplierList, setSupplierList] = useState([]);
    const [totalAmount, setTotalAmount] = useState('');
    const [unit, setUnit] = useState('');
    const [payChangeFlag, setPayChangeFlag] = useState(false);

    useEffect(() => {
        setId(rowValues.id);
        setDateOfPurchase(rowValues.dateOfPurchase);
        setItemName(rowValues.itemName);
        setPaid(rowValues.paid);
        setPay(rowValues.pay);
        setPaymentMethod(rowValues.paymentMethod);
        setQuantity(rowValues.quantity);
        setRate(rowValues.rate);
        setRemainingBalance(rowValues.remainingBalance);
        setSupplierName(rowValues.supplierName);
        setTotalAmount(rowValues.totalAmount);
        setUnit(rowValues.unit);
    }, [rowValues]);

    const onSubmit = (e) => {
        e.preventDefault();
        let values = {
            id: id,
            dateOfPurchase: dateOfPurchase,
            itemName: itemName,
            paid: paid,
            pay: payChangeFlag ? pay : 0,
            paymentMethod: paymentMethod,
            quantity: quantity,
            rate: rate,
            remainingBalance: remainingBalance,
            supplierName: supplierName,
            totalAmount: totalAmount,
            unit: unit
        };
        console.log(values);
        editRow(values);
    };

    useEffect(() => {
        const getSuppliers = async () => {
            try {
                const response = await server.get('/getSupplierName');
                setSupplierList([...response.data]);
            } catch (error) {
                console.log(error.response);
                setSupplierList([]);
            }
        };
        getSuppliers();
    }, []);

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
                    <h3 className="text-center mb-3">Update Construction Product</h3>

                    <form onSubmit={onSubmit}>
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
                                            value={itemName}
                                            onChange={(e) => setItemName(e.target.value)}
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
                                            value={rate}
                                            onChange={(e) => setRate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="name">
                                            <b>Quantity Type</b>
                                        </label>
                                        <select className="custom-select" name="unit" 
                                            value={unit}
                                            onChange={(e) => setUnit(e.target.value)}
                                        >
                                            <option value="sq.ft">sq feet</option>
                                            <option value="kg">Kg</option>
                                        </select>
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
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
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
                                        <select className="custom-select" 
                                            value={supplierName}
                                            onChange={(e) => setSupplierName(e.target.value)}
                                        >
                                            {supplierList.map((s) => {
                                                return <option value={s.name}>{s.name}</option>;
                                            })}
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
                                            className="form-control"
                                            disabled
                                            id="name"
                                            name="totalAmount"
                                            value={totalAmount}
                                            onChange={(e) => setTotalAmount(e.target.value)}
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
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group first">
                                        <label className="input_heading" htmlFor="amount">
                                            <b>Pay</b>
                                        </label>
                                        <input type="number" className="form-control" name="pay"  
                                            value={pay}
                                            onChange={(e) => {
                                                setPayChangeFlag(true);
                                                setPay(e.target.value)
                                            }}
                                        />
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
            </Fade>
        </Modal>
    );
};

export default EditModal;
