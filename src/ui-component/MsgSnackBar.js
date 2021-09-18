import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/core/Alert';

const MsgSnackBar = (props) => {
    const handleClose = () => {};

    return (
        <Snackbar
            style={{ zIndex: 2000 }}
            open={false}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={2000}
            onClose={handleClose}
        >
            <Alert severity="success">use added succesfully</Alert>
        </Snackbar>
    );
};

export default MsgSnackBar;
