import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiPaper-root": {
        margin: theme.spacing(2),
        // padding: theme.spacing(1),
      },
    },
  };
});

export { useStyles };
