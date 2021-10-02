import React, { Fragment, useState, useEffect } from 'react';
import { TextField, Paper } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
    return {
        paperbg: {
            background: '#eeeeee',
            border: `2px solid ${theme.palette.primary.main}`
            // borderColor: theme.palette.primary.light
        },
        listItems: {
            color: 'black'
        }
    };
});

const CustomPaper = (props) => {
    return <Paper elevation={8} {...props} />;
};

export default function AsyncSelector(props) {
    const classes = useStyles();
    const handleChange = (value) => {
        props.onSelectedValue(value);
    };

    return (
        <Fragment>
            <Autocomplete
                value={props.value}
                options={props.data}
                filterSelectedOptions
                PaperComponent={CustomPaper}
                getOptionLabel={(option) => option}
                onChange={(event, value) => {
                    handleChange(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" label={props.label} />}
                classes={{ paper: classes.paperbg, listbox: classes.listItems }}
            />
        </Fragment>
    );
}
