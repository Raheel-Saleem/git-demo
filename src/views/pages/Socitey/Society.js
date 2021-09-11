import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PageHeader from '../../../ui-component/PageHeader';
import SocietyForm from './SocietyFrom';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
const obj = {
    icon: <LibraryAddIcon fontSize="large" />,
    pageTitle: 'Add Society data',
    pageSubtitle: 'This form is meant to add society data i.e name,sector number,plots etc'
};
const useStyles = makeStyles((theme) => {
    return {
        root: {
            margin: theme.spacing(3),
            padding: theme.spacing(4)
        }
    };
});
function Society() {
    const classes = useStyles();
    return (
        <div>
            <PageHeader obj={obj} />
            <Paper className={classes.root}>
                <SocietyForm />
            </Paper>
        </div>
    );
}

export default Society;
