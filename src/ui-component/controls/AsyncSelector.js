import React, { Fragment, useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function AsyncSelector(props) {
    const handleChange = (value) => {
        props.onSelectedValue(value);
    };

    return (
        <Fragment>
            <Autocomplete
                value={props.value}
                options={props.data}
                filterSelectedOptions
                getOptionLabel={(option) => option}
                onChange={(event, value) => {
                    handleChange(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" label={props.label} />}
            />
        </Fragment>
    );
}
