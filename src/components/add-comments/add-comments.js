import { makeStyles, TextField, Container, Avatar, Button } from "@material-ui/core";
import { ContactsOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { API } from "../../services/requst";
import Comments from "../comments/comments";

const useStyles = makeStyles((theme) => ({
    inputComment: {
        marginTop: theme.spacing(10),
    },
    contAvaBtn: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ededed",
    },
    avatarStyle: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
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
        const commAdd = await API.post(`https://conduit.productionready.io/api/articles/${slug}/comments`, {
            comment: {
                body: commentBody
            }
        });
        setCommentBody("");
        setFlagComment(true);
    }

    return (
        <>
            <Container maxWidth="sm">
                <TextField
                    id="outlined-multiline-static"
                    label="Write your article (in markdown) *"
                    multiline
                    rows={7}
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
                {commentInfo === undefined ? null : commentInfo.map((i, index) => (<Comments key={index} slug={slug} props={commentInfo[index]} />))}
            </Container>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        image: state.image,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComments);