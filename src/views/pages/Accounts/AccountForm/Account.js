import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PageHeader from '../../../../ui-component/PageHeader';
import AccountForm from './AccountForm';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PaymentDetailsAcord from './PaymentDetailsAcord';
const obj = {
    icon: <AccountBoxIcon fontSize="large" />,
    pageTitle: 'Accounts Details',
    pageSubtitle: 'This form is meant to add account openin details i.e bank name, amount for investment etc'
};
const useStyles = makeStyles((theme) => {
    return {
        root: {
            margin: theme.spacing(3),
            padding: theme.spacing(3)
        }
    };
});
function Account() {
    const classes = useStyles();
    return (
        <div>
            <PageHeader obj={obj} />
            {/* <Paper className={classes.root}> */}
            <AccountForm />
            {/* </Paper> */}
        </div>
    );
}

export default Account;
