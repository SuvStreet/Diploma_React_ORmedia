import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        //height: theme.spacing(15),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#ededed",
        width: "100%",
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    usernameText: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        fontWeight: "bold"
    },
}));

const token = localStorage.getItem("diplomaToken");

const ProfilePage = ({ image, username, bio }) => {
    const classes = useStyles();

    return (
        <>
            {token === null
                ? <Redirect to="/" />
                : <div className={classes.root}>
                    <Avatar src={image} className={classes.large} />
                    <Typography variant="h5" className={classes.usernameText}>{username}</Typography>
                    {bio !== null ? <Typography variant="h6" >{bio}</Typography> : null}
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    const {image, username, bio} = state.user;
    return {
        image: image,
        username: username,
        bio: bio
    }
}

export default connect(mapStateToProps, null)(ProfilePage);