import React, { Fragment } from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography, Box, Stack } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/styles';
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import grey from '@material-ui/core/colors/grey';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => {
  return {
    root: {
      minWidth: 320,
      minHeight: 320,
      maxWidth: 320,
      // maxHeight: 320,
      margin: theme.spacing(3),
      '& MuiCardHeader-root': {
        padding: '12px important'
      },
      '& MuiCardContent-root': {
        padding: '12px important'
      }
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    cardHeader: {},
    link: {
      textDecoration: 'none'
    }
  };
});
function PlotCard({ plot }) {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('plot');
  console.log("::::::::::::::::::::::::;PlotCard", param)
  const { dateTime, description, plotownername, sectorno, societyname, id, plotno } = plot || {}
  return (
    <Fragment key={id}>
      <Card className={classes.root} elevation={0}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              H
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={plotownername || ""}
          subheader={new Date(dateTime).toDateString() || ""}
        />
        <Divider />
        <CardContent>
          <Stack spacing={0}>
            <Box sx={{ ml: 2.5 }}>
              <Typography fontWeight={700} color="secondary">
                {societyname || ""}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              <LocationOnTwoToneIcon sx={{ color: grey[500] }} fontSize="small" />
              {sectorno || ""} plot number {plotno || ""}
            </Typography>
          </Stack>

          <Divider />
          <Box sx={{ ml: 0 }}>
            <ul>
              <li>{description || ""}</li>

            </ul>
          </Box>
        </CardContent>
        <CardActions>
          {!param || param === "buy" && <Link to={`/addPartnerToPlot/${societyname}/${sectorno}/${plotno}`} className={classes.link}>
            <Button size="medium" color="primary">
              Buy
            </Button>
          </Link>}
          {param && param === "sell" && <Link to={`/sellPlot/${societyname}/${sectorno}/${plotno}`} className={classes.link}>
            <Button size="medium" color="primary">
              Sell
            </Button>
          </Link>}
          <Button size="medium" color="primary">
            See More
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
}

export default PlotCard;
