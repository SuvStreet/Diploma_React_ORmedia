import { makeStyles } from "@material-ui/core";
import React from "react";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root:{
        height: theme.spacing(15),
        backgroundColor: "grey",
        width: "100%",
    }
}));

const username = localStorage.getItem("diplomaUser");

const Profile = () => {
    const classes = useStyles();

    return(
        <>
            {username === null
            ? <Redirect to="/" />
            : <div className={classes.root}>

            </div>
            
            
            }
        </>
    )
}

export default Profile;