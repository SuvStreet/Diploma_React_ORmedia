import { Avatar, Container, Typography, Link, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { API } from "../../services/requst";
import { FormatData } from "../format-date";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    containerRoot: {
        marginTop: theme.spacing(2),
        border: "#ededed 1px solid",
    },
    styleComment: {
        borderBottom: "#ededed 1px solid",
        padding: theme.spacing(2),
    },
    rootInfoCommentUser: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(2),
    },
    infoCommentUser: {
        width: theme.spacing(100),
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    style: {
        marginRight: theme.spacing(1)
    },
    removeComment: {

    }
}));

const Comments = ({props : {body, author: {image, username}, createdAt, id}}) => {
    const classes = useStyles();

    const hendleRemoveComment = async (id) => {
        console.log("###: id", id);
        //const removeComm = await API.delete(`https://conduit.productionready.io/api/articles/test-y6nim5/comments/${id}`);
    }

    //console.log("###: image", image);

    return (
        <>
            <div className={classes.containerRoot}>
                <div className={classes.styleComment}>
                    <Typography>
                        {body}
                    </Typography>
                </div>
                <div className={classes.rootInfoCommentUser}>
                    <div className={classes.infoCommentUser}>
                        <Avatar src={image} className={classes.style} />
                        <Link className={classes.style}>{username}</Link>
                        {FormatData(createdAt)}
                    </div>
                    <div className={classes.removeComment}>
                        <DeleteForeverIcon onClick={hendleRemoveComment} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments;