import React from 'react';
import { Fragment } from 'react';
// import PageHeader from '../../../ui-component/PageHeader ';
import StoreIcon from '@material-ui/icons/Store';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PlotGrid from './PlotGrid';
const obj = {
    icon: <StoreIcon fontSize="large" />,
    pageTitle: 'Purchase Property ',
    pageSubtitle: 'This Page  is meant to buy plots ,see details of plot'
};
const useStyles = makeStyles((theme) => {
    return {
        root: {
            margin: theme.spacing(2),
            padding: theme.spacing(1),

            background: '#bbdefb'
        },
        selectBar: {
            marginBottom: theme.spacing(3)
        }
    };
});
function PurchaseProperty() {
    const classes = useStyles();
    return (
        <Fragment>
            {/* <PageHeader obj={obj} /> */}
            {/* <Paper className={classes.root}> */}
            <div>
                <PlotGrid />
            </div>
            {/* </Paper> */}
        </Fragment>
    );
}
export default PurchaseProperty;
