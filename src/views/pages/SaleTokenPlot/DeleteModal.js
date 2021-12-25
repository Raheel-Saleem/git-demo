import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Fade } from '@material-ui/core';

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

const DeleteModal = ({ open, close, deleteRow, deleteId }) => {
    const classes = useStyles();

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
                    <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header flex-column">
                                <div className="icon-box">
                                    <i className="material-icons">&#xE5CD;</i>
                                </div>
                                <h4 className="modal-title w-100">Are you sure?</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => close()}>
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Do you really want to delete these records? This process cannot be undone.</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => close()}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => deleteRow(deleteId)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default DeleteModal;
