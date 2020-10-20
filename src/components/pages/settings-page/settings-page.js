import { Button, Container, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    rootContainer: {
        textAlign: "center",
        marginTop: theme.spacing(5),
    },
    rootForm: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    input: {
        marginTop: theme.spacing(2)
    },
    btnUpdate: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    btnExit: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(21.1)
    }
}));

const nameUser = localStorage.getItem("userDiploma")

const SettingsPage = () => {
    const classes = useStyles();

    const [infoUser, setInfoUser] = useState(nameUser);

    //console.log(infoUser)

    const hendelExit = () => {
        localStorage.removeItem("diplomaToken");
        localStorage.removeItem("userDiploma");
        setInfoUser("");
    }

    return (
        <>
            {infoUser !== "" ? null : <Redirect to="/" />}
            <Container maxWidth="xs" className={classes.rootContainer}>
                <Typography variant="h5">Your Settings</Typography>
                <form className={classes.rootForm} noValidate autoComplete="on">
                    <TextField label="URL of profile picture" variant="outlined" fullWidth className={classes.input} />
                    <TextField label="Username *" variant="outlined" fullWidth className={classes.input} />
                    <TextField
                        id="outlined-multiline-static"
                        label="Short bio about you"
                        multiline
                        rows={5}
                        variant="outlined"
                        className={classes.input}
                    />
                    <TextField label="Email *" variant="outlined" fullWidth className={classes.input} />
                    <TextField type="password" label="New Password *" variant="outlined" fullWidth className={classes.input} />
                    <Button variant="contained" color="primary" size="large" type="submit" className={classes.btnUpdate}>
                        Update Setting
                    </Button>
                </form>
                <hr />
                <Button variant="contained" color="secondary" size="large" onClick={hendelExit} className={classes.btnExit}>
                    Or click here to logout
                </Button>
            </Container>
        </>
    )
}

export default SettingsPage;