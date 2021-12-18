import React from 'react';
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

const EditModal = ({ open, close, rowValues, editRow }) => {
    const classes = useStyles();

    const onSubmit = (values, submitProps) => {
        console.log('Form data', values);
        editRow(values);
        submitProps.setSubmitting(false);
        submitProps.resetForm();
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
                    <h3 className="text-center mb-3">Update Construction Supplier</h3>
                    <Formik initialValues={rowValues} onSubmit={onSubmit} enableReinitialize>
                        {(formik) => (
                            <Form className="signup-form">
                                <div className="form-group mb-2">
                                    <label htmlFor="name">Name</label>
                                    <Field type="text" className="form-control" name="name" />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="email">Contact</label>
                                    <Field type="text" className="form-control" placeholder="johndoe@gmail.com" name="contact" />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="password">Address</label>
                                    <Field type="text" className="form-control" placeholder="Cnic" name="address" />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="password">CNIC</label>
                                    <Field type="text" className="form-control" placeholder="Cnic" name="cnic" />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="password">Filer</label>
                                    <Field as="select" className="form-control" name="filer">
                                        <option value={true}>Filer</option>
                                        <option value={false}>Non Filer</option>
                                    </Field>
                                </div>
                                <div className="form-group mb-2">
                                    <button type="submit" className="form-control btn btn-primary rounded submit px-3">
                                        Update
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Fade>
        </Modal>
    );
};

export default EditModal;
