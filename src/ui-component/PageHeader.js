import React from 'react';
import { Paper, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import indigo from '@material-ui/core/colors/indigo';

const useStyles = makeStyles((theme) => {
    return {
        root: {
            padding: theme.spacing(1)
        },
        pageHeader: {
            display: 'flex',
            padding: theme.spacing(2)
            // marginBottom: theme.spacing(2)
        },
        pageTitle: {
            paddingLeft: theme.spacing(1),

            '& .MuiTypography-subtitle2': {
                opacity: '0.6'
            }
        },

        pageIcon: {
            display: 'inline-block',
            padding: theme.spacing(2),
            color: indigo[400]
        }
    };
});

function PageHeader(props) {
    const { icon, pageTitle, pageSubtitle } = { ...props.obj };
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper square variant="outlined">
                <div className={classes.pageHeader}>
                    <Card className={classes.pageIcon}>{icon}</Card>
                    <div className={classes.pageTitle}>
                        <Typography component="div" variant="h5" style={{ textTransform: 'capitalize' }}>
                            {pageTitle}
                        </Typography>
                        <Typography component="div" variant="subtitle2">
                            {pageSubtitle}
                        </Typography>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default PageHeader;
