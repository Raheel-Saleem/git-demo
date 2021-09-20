import React, { useState, useEffect } from 'react';
import { Grid, Paper, Card } from '@material-ui/core';
import PageHeader from '../../../ui-component/PageHeader';
import StoreIcon from '@material-ui/icons/Store';
import PlotForm from './PlotForm';
import PlotSelectors from './PlotSelectors';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ModalData from './ModalData';
const obj = {
    icon: <StoreIcon fontSize="large" />,
    pageTitle: 'Add Plot',
    pageSubtitle: 'This form is meant to add plot data  for purchasing and saling i.e development ,without dev,etc'
};
const useStyles = makeStyles((theme) => {
    return {
        root: {
            margin: theme.spacing(3),
            padding: theme.spacing(4)
        },
        selectBar: {
            marginBottom: theme.spacing(4)
        }
    };
});
function Plot() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelector = (selectedValues) => {
        const plotSelectorValues = {
            ...selectedValues
        };

        console.log('plotSelectorValues==>', plotSelectorValues);
    };
    const handleForm = (values) => {
        const formValues = {
            ...values
        };
        console.log('formValues==>', formValues);
    };

    const body = (
        <div>
            <ModalData />
        </div>
    );

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                {body}
            </Modal>
            <PageHeader obj={obj} />
            <Paper className={classes.root}>
                <div className={classes.selectBar}>
                    <PlotSelectors onSelecteorValues={handleSelector} />
                </div>
                <PlotForm onSetFormData={handleForm} />
            </Paper>
        </div>
    );
}

export default Plot;
