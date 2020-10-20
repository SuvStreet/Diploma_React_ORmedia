import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, TextField, Typography } from "@material-ui/core";

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
    }
}));

const NewArticlePage = () => {
    const classes = useStyles();

    return (
        <>
            <Container maxWidth="xs" className={classes.rootContainer}>
                <Typography variant="h5">Your New Article</Typography>
                <form noValidate autoComplete="off">
                    <TextField label="Article Title" variant="outlined" fullWidth className={classes.input} />
                    <TextField label="What`s this article about?" variant="outlined" fullWidth className={classes.input} />
                    <TextField
                        id="outlined-multiline-static"
                        label="Write your article (in markdown)"
                        multiline
                        rows={7}
                        variant="outlined"
                        className={classes.input}
                        fullWidth
                    />
                    <TextField label="Enter tags" variant="outlined" fullWidth className={classes.input} />
                    <Button variant="contained" color="primary" size="large" type="submit" fullWidth className={classes.btnPublish}>
                        Publish article
                    </Button>
                </form>
            </Container>
        </>
    )
}

export default NewArticlePage;