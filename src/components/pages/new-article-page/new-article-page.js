import React, { useState } from "react";
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

const NewArticlePage = () => {
    const classes = useStyles();

    const [articleTitle, setArticleTitle] = useState("");
    const [articleAbout, setArticleAbout] = useState("");
    const [articleBody, setArticleBody] = useState("");
    const [addTag, setAddTag] = useState([]);
    const [errorTitle, setErrorTitle] = useState(undefined);
    const [errorDescription, setErrorDescription] = useState(undefined);
    const [errorBody, setErrorBody] = useState(undefined);
    const [success, setSuccess] = useState(false);
    const [slugArticle, setSlugArticle] = useState(false);

    const hendelAddTag = (event) => {
        let space = " ";
        let stringToSplit = event.target.value;
        setAddTag(stringToSplit.split(space));
    }

    const hendlePublish = async (e) => {
        console.log("###: addTags", addTag);
        e.preventDefault();
        let publishArticle = await API.post(`https://conduit.productionready.io/api/articles/`, {
            article: {
                tagList: addTag,
                title: articleTitle,
                description: articleAbout,
                body: articleBody
            },
        }).catch(error => {
            if (error.request) {
                const { title, description, body } = error.request.response.errors
                setErrorTitle(title);
                setErrorDescription(description);
                setErrorBody(body);
            }
        });
        if (publishArticle) {
            const { slug } = publishArticle.data.article;
            setSlugArticle(slug);
            setSuccess(true);
        }
    }

    const errorsRender = () => {
        return (
            <>
                <Container className={classes.rootErrors} >
                    <Typography variant="subtitle2" gutterBottom>
                        {errorTitle !== undefined
                            ? `* title ${errorTitle[0]} ${errorTitle[1]}`
                            : null}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {errorDescription !== undefined
                            ? `* description ${errorDescription[0]} ${errorDescription[1]}`
                            : null}
                    </Typography>
                    <Typography variant="subtitle2">
                        {errorBody !== undefined
                            ? `* body ${errorBody}`
                            : null}
                    </Typography>
                </Container>
            </>
        )
    }

    const mainRender = () => {
        return (
            <Container maxWidth="sm" className={classes.rootContainer}>
                <Typography variant="h5">
                    Your New Article
                    </Typography>
                {errorsRender()}
                <form noValidate autoComplete="off">
                    <TextField
                        label="Article Title *"
                        variant="outlined"
                        fullWidth
                        className={classes.input}
                        onChange={(e) => setArticleTitle(e.target.value)} />
                    <TextField
                        label="What`s this article about? *"
                        variant="outlined"
                        fullWidth
                        className={classes.input}
                        onChange={(e) => setArticleAbout(e.target.value)} />
                    <TextField
                        id="outlined-multiline-static"
                        label="Write your article (in markdown) *"
                        multiline
                        rows={7}
                        variant="outlined"
                        className={classes.input}
                        fullWidth
                        onChange={(e) => setArticleBody(e.target.value)} />
                    <TextField
                        label="Enter tags"
                        variant="outlined"
                        fullWidth
                        onChange={hendelAddTag}
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
                        Publish article
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
                    ? <Redirect to={`/article/${slugArticle}`} />
                    : mainRender()
            }
        </>
    )
}

export default NewArticlePage;