import React, { Fragment } from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles((theme) => {
    return {
        root: {
            maxWidth: 320,
            maxHeight: 280,
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
            color: theme.palette.getContrastText(theme.palette.secondary.light)
        },
        cardHeader: {}
    };
});
function PlotCard() {
    const classes = useStyles();
    return (
        <Fragment>
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
                    title="Huzaifa Fiaz"
                    subheader="September 14, 2016"
                />
                <Divider />
                <CardContent>
                    <Typography variant="h4"> D-Block</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen
                        peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="medium" color="primary">
                        Buy
                    </Button>
                    <Button size="medium" color="primary">
                        See More
                    </Button>
                </CardActions>
            </Card>
        </Fragment>
    );
}

export default PlotCard;
