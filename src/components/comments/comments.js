import { makeStyles, TextField, Container, Avatar } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    contAvaBtn: {
        height: theme.spacing(10),
        backgroundColor: "grey",
    }
}));

const Comments = ({ img }) => {

    const classes = useStyles();

    return (
        <>
            <Container maxWidth="sm">
                <TextField
                    id="outlined-multiline-static"
                    label="Write your article (in markdown) *"
                    multiline
                    rows={7}
                    variant="outlined"
                    /* className={classes.input} */
                    fullWidth
                /* onChange={handleBody} */
                />
                <Container className={classes.contAvaBtn}>
                    <Avatar alt="img" src={img} />
                </Container>
            </Container>
        </>
    )
}

export default Comments;