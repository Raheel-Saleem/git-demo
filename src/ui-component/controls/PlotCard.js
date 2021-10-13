import React, { Fragment } from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography, Box, Stack } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import grey from '@material-ui/core/colors/grey';

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
                    <Stack spacing={0}>
                        <Box sx={{ ml: 2.5 }}>
                            <Typography fontWeight={700} color="secondary">
                                D-Block
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            <LocationOnTwoToneIcon sx={{ color: grey[500] }} fontSize="small" />
                            Nashtar, Lahore
                        </Typography>
                    </Stack>
                    {/* <Box sx={{ m: 0.5 }}>
                        <Typography variant="h4" color="secondary">
                            {' '}
                            D-Block
                            <Typography variant="body2" color="text.secondary">
                                <LocationOnIcon sx={{ color: grey[500] }} /> Scranton, PA
                            </Typography>
                        </Typography>
                    </Box> */}
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen
                        peas along with the mussels, if you like.
                    </Typography> */}
                    <Divider />
                    <Box sx={{ ml: 0 }}>
                        <ul>
                            <li>This is a Plot</li>
                            <li>Plot price is 45762</li>
                            <li>This is a Plot</li>
                            <li>This is a Plot</li>
                        </ul>
                    </Box>
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
