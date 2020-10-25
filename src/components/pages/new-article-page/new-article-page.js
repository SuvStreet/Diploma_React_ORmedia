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

const NewArticlePage = () => {
    const classes = useStyles();

    const [articleTitle, setArticleTitle] = useState("");
    const [articleAbout, setArticleAbout] = useState("");
    const [articleBody, setArticleBody] = useState("");
    const [errorTitle, setErrorTitle] = useState(undefined);
    const [errorDescription, setErrorDescription] = useState(undefined);
    const [errorBody, setErrorBody] = useState(undefined);

    const handleTitle = (event) => {
        setArticleTitle(event.target.value);
        //console.log("####: title", articleTitle);
    }

    const handleAbout = (event) => {
        setArticleAbout(event.target.value);
        //console.log("####: about", articleAbout);
    }

    const handleBody = (event) => {
        setArticleBody(event.target.value);
        //console.log("####: body", articleBody);
    }

    const hendlePublish = async (e) => {
        e.preventDefault();
        let publishArticle = await API.post("https://conduit.productionready.io/api/articles/", {
            article: {
                taglist: [],
                title: articleTitle,
                description: articleAbout,
                body: articleBody
            },
        }).catch(error => {
            if (error.request) {
                //console.log("####: error", error.request.response);
                setErrorTitle(error.request.response.errors.title);
                setErrorDescription(error.request.response.errors.description);
                setErrorBody(error.request.response.errors.body);
            }
        });
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
    
    return (
        <>
            {token === null
                ? <Redirect to="/" />
                : <Container maxWidth="sm" className={classes.rootContainer}>
                    <Typography variant="h5">Your New Article</Typography>
                    {errorsRender()}
                    <form noValidate autoComplete="off">
                        <TextField
                            label="Article Title *"
                            variant="outlined"
                            fullWidth
                            className={classes.input}
                            onChange={handleTitle} />
                        <TextField
                            label="What`s this article about? *"
                            variant="outlined"
                            fullWidth
                            className={classes.input}
                            onChange={handleAbout} />
                        <TextField
                            id="outlined-multiline-static"
                            label="Write your article (in markdown) *"
                            multiline
                            rows={7}
                            variant="outlined"
                            className={classes.input}
                            fullWidth
                            onChange={handleBody}
                        />
                        <TextField
                            label="Enter tags"
                            variant="outlined"
                            fullWidth
                            className={classes.input} />
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            fullWidth onClick={hendlePublish}
                            className={classes.btnPublish}
                        >
                            Publish article
                        </Button>
                    </form>
                </Container>
            }
        </>
    )
}

export default NewArticlePage;