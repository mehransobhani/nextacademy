import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    style: {
        color: '#00BAC6'
    }
});

export default function CircularIndeterminate() {
    const classes = useStyles();

    return (
            <CircularProgress className={classes.style} />
    );
}