import { Typography, TableCell } from "@material-ui/core";

export const renderItem = (name, value) => (
  <>
    <Typography variant="body2">{name}</Typography>
    <Typography component="h5" variant="h5">
      {value}
    </Typography>
  </>
);

export const renderTh = (text, align) => (
  <TableCell component="th" align={align}>
    <Typography component="h5" variant="h5">
      {text}
    </Typography>
  </TableCell>
);