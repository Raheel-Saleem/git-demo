import React, { useState, useRef } from 'react';
import { Paper } from '@material-ui/core';
import PageHeader from '../../../ui-component/PageHeader';
import StoreIcon from '@material-ui/icons/Store';
import PlotForm from './PlotForm';
import PlotSelectors from './PlotSelectors';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';
import ModalData from './ModalData';
import server from '../../../server/server';
import swal from 'sweetalert';
import { startLoading, stopLoading } from '../../../store/actions';
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
const initialSelectObj = {
    societyname: '',
    sectorno: '',
    plot: ''
};
const initialFormObj = {
    plotownername: '',
    plotamount: '',
    development: false,
    description: ''
};
const sendRequest = async (selectorData, formData, dispatch) => {
    try {
        dispatch(startLoading());
        let data = { ...selectorData, ...formData };
        console.log('from sending request data===>', data);
        let response = await server.post('/plottopurchase', { ...data });
        dispatch(stopLoading());

        if (response.status === 200) {
            swal('Success!', 'Plot Added Succesfully!', 'success');
        }
        if (response.status === 400) {
            swal('Error!', 'Society Name, Sector or Plot may not exist!', 'error');
        }
    } catch (error) {
        dispatch(stopLoading());
        swal('Error!', 'Something went wrong,try again!', 'error');
    }
};

function Plot() {
    const resetChild = useRef();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selector, setSelector] = useState(initialSelectObj);
    const [form, setForm] = useState(initialFormObj);
    const resetUpper = () => {
        setSelector(initialSelectObj);
    };
    const resetLower = () => {
        setForm(initialFormObj);
    };

    // console.log(Object.keys(data).length);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // const handleStateSelector=(values)=

    const handleResetChild = () => {
        resetChild.current.resetSelector();
    };

    // useEffect(() => {
    //     console.log(' selector data from useEffect in plot file', selector, form);
    // }, [selector, form]);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <ModalData
                    selector={selector}
                    form={form}
                    Close={handleClose}
                    sendRequest={sendRequest}
                    resetLower={resetLower}
                    resetUpper={resetUpper}
                    resetall={handleResetChild}
                />
            </Modal>
            <PageHeader obj={obj} />
            <Paper className={classes.root}>
                <div className={classes.selectBar}>
                    <PlotSelectors onSelecteorValues={setSelector} resetUpper={resetUpper} ref={resetChild} />
                </div>
                <PlotForm onSetFormData={setForm} openModal={handleOpen} />
            </Paper>
        </div>
    );
}

export default Plot;
