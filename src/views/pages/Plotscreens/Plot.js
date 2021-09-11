import React from 'react';
import { Grid, Paper, Card } from '@material-ui/core';
import PageHeader from '../../../ui-component/PageHeader';
import StoreIcon from '@material-ui/icons/Store';
import PlotForm from './PlotForm';
import PlotSelectors from './PlotSelectors';
import { makeStyles } from '@material-ui/styles';
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
            marginBottom: theme.spacing(3)
        }
    };
});
function Plot() {
    const classes = useStyles();
    return (
        <div>
            <PageHeader obj={obj} />
            <Paper className={classes.root}>
                <div className={classes.selectBar}>
                    <PlotSelectors />
                </div>
                <PlotForm />
            </Paper>
        </div>
    );
}

export default Plot;
