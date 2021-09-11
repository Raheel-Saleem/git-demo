import React, { Fragment } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function AsyncSelector(props) {
    return (
        <Fragment>
            <Autocomplete
                options={props.data}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
        </Fragment>
    );
}
