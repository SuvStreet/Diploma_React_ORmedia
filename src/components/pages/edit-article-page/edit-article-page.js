import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import { API } from "../../../services/requst";

const useStyles = makeStyles((theme) => ({
    rootContainer: {
        textAlign: "center",
        marginTop: theme.spacing(5),
    },
    input: {
        marginTop: theme.spacing(2)
    },
    btnPublish: {
        marginTop: theme.spacing(2)
    },
    rootErrors: {
        color: "red",
        fontWeight: 700,
        marginTop: theme.spacing(1)
    }
}));

const token = localStorage.getItem("diplomaToken");

const EditArticlePage = ({ match }) => {
    const classes = useStyles();

    const { id } = match.params;

    const [articleTitle, setArticleTitle] = useState("");
    const [articleAbout, setArticleAbout] = useState("");
    const [articleBody, setArticleBody] = useState("");
    const [addTag, setAddTag] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function getFetchData() {
            const fetchDataArticle = await API.get(`https://conduit.productionready.io/api/articles/${id}`)
            console.log("###: fetchDataArticle", fetchDataArticle.data.article);
            const { title, description, body, tagList } = fetchDataArticle.data.article;
            setArticleTitle(title);
            setArticleAbout(description);
            setArticleBody(body);
            setAddTag(tagList);
        }
        getFetchData();
    }, []);

    const hendelAddTag = (event) => {
        let space = " ";
        let stringToSplit = event.target.value;
        setAddTag(stringToSplit.split(space));
    }

    const hendlePublish = async (e) => {
        e.preventDefault();
        await API.put(`https://conduit.productionready.io/api/articles/${id}`, {
            article: {
                tagList: addTag,
                title: articleTitle,
                description: articleAbout,
                body: articleBody
            },
        });
        setSuccess(true);
    }

    const mainRender = () => {
        return (
            <Container maxWidth="sm" className={classes.rootContainer}>
                <Typography variant="h5">
                    Edit Article
                </Typography>
                <form noValidate autoComplete="off">
                    <TextField
                        label="Article Title *"
                        variant="outlined"
                        fullWidth
                        className={classes.input}
                        onChange={(e) => setArticleTitle(e.target.value)}
                        value={articleTitle} />
                    <TextField
                        label="What`s this article about? *"
                        variant="outlined"
                        fullWidth
                        className={classes.input}
                        value={articleAbout}
                        onChange={(e) => setArticleAbout(e.target.value)} />
                    <TextField
                        id="outlined-multiline-static"
                        label="Write your article (in markdown) *"
                        multiline
                        rows={7}
                        variant="outlined"
                        className={classes.input}
                        fullWidth
                        value={articleBody}
                        onChange={(e) => setArticleBody(e.target.value)} />
                    <TextField
                        label="Enter tags"
                        variant="outlined"
                        fullWidth
                        onChange={hendelAddTag}
                        value={addTag}
                        className={classes.input} />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        fullWidth
                        onClick={hendlePublish}
                        className={classes.btnPublish}
                    >
                        Edit Article
                    </Button>
                </form>
            </Container>
        )
    }

    return (
        <>
            {token === null
                ? <Redirect to="/" />
                : success
                    ? <Redirect to={`/article/${id}`} />
                    : mainRender()
            }
        </>
    )
}

export default EditArticlePage;