// "tokenAmount": 0,
//   "tokenDays": "",
//     "tokenDescription": "",
//       "taxAmount": 2000,
import React from "react"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputField from './FormFields/InputField';

export default function Cheque(props) {
  const {
    formField: { tokenAmount, tokenDays, taxAmount, tokenDescription }
  } = props;

  return (
    <React.Fragment>
      <Typography variant="h3" sx={{ my: 2 }}>
        Token Info:
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
            name={tokenAmount.name}
            label={tokenAmount.label}
            fullWidth
            variant="outlined"
            size="small"
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={tokenDays.name} label={tokenDays.label} fullWidth variant="outlined" size="small" type="number" />
        </Grid>
        <Grid item xs={12}>
          <InputField name={taxAmount.name} label={taxAmount.label} fullWidth variant="outlined" size="small" type="text" />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={tokenDescription.name}
            label={tokenDescription.label}
            fullWidth
            variant="outlined"
            size="small"
            type="text"
            multiline
            rows={3}
            rowsMax={4}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
