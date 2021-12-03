import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import { Fade } from '@material-ui/core';
import { useFormik } from 'formik';
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
    username: '',
    email: '',
    phoneno: '',
    cnic: ''
};

const EditModal = ({ open, close, editId, editRow }) => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues,

        onSubmit: (values, onSubmitProps) => {
            console.log('from on submit fun', values);
            editRow(values, editId);
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
        }
    });

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
                    <h3 className="text-center mb-3">Update User Account</h3>
                    <form onSubmit={formik.handleSubmit} className="signup-form">
                        <div className="form-group mb-2">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="John Doe"
                                name="username"
                                {...formik.getFieldProps('username')}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="johndoe@gmail.com"
                                name="email"
                                {...formik.getFieldProps('email')}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="password">Cnic</label>
                            <input type="text" className="form-control" placeholder="Cnic" name="cnic" {...formik.getFieldProps('cnic')} />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="password">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Phone Number"
                                name="phoneno"
                                {...formik.getFieldProps('phoneno')}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <button type="submit" className="form-control btn btn-primary rounded submit px-3">
                                Update
                            </button>
                        </div>
                        <div className="form-group d-md-flex"></div>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
};

export default EditModal;
