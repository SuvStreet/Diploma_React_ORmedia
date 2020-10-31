import { makeStyles, TextField, Container, Avatar, Button, Typography, Link } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link as RouterLink } from 'react-router-dom';

import { API } from "../../services/requst";
import { FormatData } from "../format-date";

const useStyles = makeStyles((theme) => ({
    inputComment: {
        marginTop: theme.spacing(5),
    },
    contAvaBtn: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ededed",
    },
    avatarStyle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },

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
        justifyContent: "space-between",
        alignItems: "center",
        padding: theme.spacing(2),
    },
    infoCommentUser: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    style: {
        marginRight: theme.spacing(1)
    },
    btnRemoveMassage: {
        color: "grey",
        transition: "0.5s",
        "&:hover": {
            color: "red",
            border: "1px solid red",
            transition: "0.5s",
        }
    }
}));

const AddComments = ({ image, slug }) => {
    const classes = useStyles();

    const [commentInfo, setCommentInfo] = useState(undefined);
    const [commentBody, setCommentBody] = useState("");
    const [flagComment, setFlagComment] = useState(false);

    async function fetchData() {
        const comm = await API.get(`https://conduit.productionready.io/api/articles/${slug}/comments`);
        setCommentInfo(comm.data.comments);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (flagComment) {
            setFlagComment(false);
            fetchData();
        }
    }, [flagComment]);

    const handelAddComment = async () => {
        await API.post(`https://conduit.productionready.io/api/articles/${slug}/comments`, {
            comment: {
                body: commentBody
            }
        });
        setCommentBody("");
        setFlagComment(true);
    }

    async function hendleRemoveComment(slug, id) {
        await API.delete(`https://conduit.productionready.io/api/articles/${slug}/comments/${id}`);
        setFlagComment(true);
    }

    const RenderComments = (index) => {
        const { body, author: { username }, createdAt, id } = commentInfo[index]

        return (
            <div key={index} className={classes.containerRoot}>
                <div className={classes.styleComment}>
                    <Typography>
                        {body}
                    </Typography>
                </div>
                <div className={classes.rootInfoCommentUser}>
                    <div className={classes.infoCommentUser}>
                        <Avatar src={image} className={classes.style} />
                        <Link component={RouterLink} to={`/profile/${username}`} className={classes.style}>{username}</Link>
                        {FormatData(createdAt)}
                    </div>
                    <Button
                        startIcon={<DeleteForeverIcon />}
                        variant="outlined"
                        onClick={() => hendleRemoveComment(slug, id)}
                        className={classes.btnRemoveMassage}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <>
            <Container maxWidth="sm">
                <TextField
                    id="outlined-multiline-static"
                    label="Write your article (in markdown) *"
                    multiline
                    rows={5}
                    variant="outlined"
                    className={classes.inputComment}
                    fullWidth
                    value={commentBody}
                    onChange={e => setCommentBody(e.target.value)}
                />
                <Container className={classes.contAvaBtn}>
                    <Avatar alt="img" src={image} className={classes.avatarStyle} />
                    <Button variant="contained" color="primary" onClick={handelAddComment}>Post Comment</Button>
                </Container>
                {/* {commentInfo === undefined ? null : commentInfo.map((i, index) => (<Comments key={index} slug={slug} props={commentInfo[index]} />))} */}
                {
                    commentInfo === undefined
                        ? null
                        : commentInfo.map((i, index) => (RenderComments(index)))
                }
            </Container>
        </>
    )
}

const mapStateToProps = (state) => {
    const { image } = state.user;
    return {
        image,
    };
};

export default connect(mapStateToProps, null)(AddComments);