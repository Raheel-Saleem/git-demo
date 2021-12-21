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

const DetailModal = ({ open, close, rowID }) => {
    const classes = useStyles();
    const [datalist, setDatalist] = useState([]);

    useEffect(() => {
        const getMaterials = async () => {
            try {
                const response = await server.get('/getMaterialAgainstPlotId/' + rowID);
                console.log(response);
                setDatalist(response.data);
            } catch (error) {
                console.log(error.response);
                setDatalist([]);
            }
        };
        getMaterials();
    }, [rowID]);

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
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h2>Material Details :</h2>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="table-primary">
                                <tr>
                                    {/* <th>ID#</th> */}
                                    {['itemName', 'quantity', 'quantityType', 'supplierName', 'totalAmount'].map((column) => {
                                        const result = column.replace(/([A-Z])/g, ' $1');
                                        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                                        console.log(finalResult);
                                        return (
                                            <th>
                                                {finalResult}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {datalist.map((row) => (
                                    <tr key={row.id}>
                                        {/* <td>{row.id}</td> */}
                                        {['itemName', 'quantity', 'quantityType', 'supplierName', 'totalAmount'].map((column) => (
                                            <td>{row[column]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default DetailModal;
