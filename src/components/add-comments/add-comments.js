import { makeStyles, TextField, Container, Avatar, Button } from "@material-ui/core";
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

const AddComments = ({ image }) => {
    const classes = useStyles();

    const [commentInfo, setCommentInfo] = useState(undefined);

    async function fetchData() {
        const comm = await API.get(`https://conduit.productionready.io/api/articles/test-y6nim5/comments`);
        setCommentInfo(comm.data.comments);
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                /* onChange={handleBody} */
                />
                <Container className={classes.contAvaBtn}>
                    <Avatar alt="img" src={image} className={classes.avatarStyle} />
                    <Button variant="contained" color="primary">Post Comment</Button>
                </Container>
                { commentInfo === undefined ? null : commentInfo.map((i, index) => (<Comments key={index} props={commentInfo[index]} />)) }
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