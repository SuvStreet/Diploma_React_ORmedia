import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    headerTitle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        backgroundColor: "green",
        fontSize: theme.spacing(2.5),
    },
    h1: {
        margin: "15px 0 0 0",
    },
    p: {
        fontWeight: "bold"
    },
}));

const HeaderTitle = () => {
    const classes = useStyles();

    return (
        <div className={classes.headerTitle}>
            <h1 className={classes.h1}>Diploma</h1>
            <p className={classes.p}>A place to share your React knowledge.</p>
        </div>
    )
}

export default HeaderTitle;