import { Button, Container, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { userLoginOut } from "../../../actions/actions";
import { userUpdata } from "../../../actions/actions";
import { API } from "../../../services/requst";

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
        marginBottom: theme.spacing(2)
    }
}));

const SettingsPage = ({ onLogOut, image, username, bio, email, onUserUpdata, createdAt, id, token }) => {
    const classes = useStyles();

    const [userToken, setUserToken] = useState(true);
    const [flagSuccess, setFlagSuccess] = useState(false);
    const [userAvatarUrl, setUserAvatarUrl] = useState(image);
    const [usernameValue, setUsernameValue] = useState(username);
    const [userBioValue, setUserBioValue] = useState(bio);
    const [userEmailValue, setUserEmailValue] = useState(email);
    const [userPasswordValue, setUserPasswordValue] = useState("");

    const hendelExit = () => {
        localStorage.removeItem("diplomaToken");
        onLogOut();
        setUserToken(false);
        API.defaults.headers.common['Authorization'] = ``;
    }

    const hendelUpdate = async (e) => {
        e.preventDefault();
        const dataUserUpdata = await API.put(`https://conduit.productionready.io/api/user`, {
            user: {
                bio: userBioValue,
                createdAt,
                email: userEmailValue,
                id,
                image: userAvatarUrl,
                password: userPasswordValue,
                token,
                updatedAt: new Date(),
                username: usernameValue,
            }
        });
        if (dataUserUpdata) {
            setFlagSuccess(true);
            onUserUpdata(dataUserUpdata.data.user);
        }
    }

    return (
        (!userToken)
            ? <Redirect to="/" />
            : flagSuccess
                ? <Redirect to={`/profile/${usernameValue}`} />
                : <Container maxWidth="xs" className={classes.rootContainer}>
                    <Typography variant="h5">Your Settings</Typography>
                    <form className={classes.rootForm} noValidate autoComplete="on">
                        <TextField
                            label="URL of profile picture"
                            variant="outlined"
                            fullWidth
                            defaultValue={image}
                            onChange={(e) => setUserAvatarUrl(e.target.value)}
                            className={classes.input}
                        />
                        <TextField
                            label="Username *"
                            variant="outlined"
                            fullWidth
                            defaultValue={username}
                            onChange={(e) => setUsernameValue(e.target.value)}
                            className={classes.input} />
                        <TextField
                            label="Short bio about you"
                            multiline
                            rows={5}
                            variant="outlined"
                            defaultValue={bio}
                            onChange={(e) => setUserBioValue(e.target.value)}
                            className={classes.input}
                        />
                        <TextField
                            label="Email *"
                            variant="outlined"
                            fullWidth
                            defaultValue={email}
                            onChange={(e) => setUserEmailValue(e.target.value)}
                            className={classes.input}
                        />
                        <TextField
                            type="password"
                            label="New Password *"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setUserPasswordValue(e.target.value)}
                            className={classes.input}
                        />
                        <Button variant="contained" color="primary" size="large" type="submit" className={classes.btnUpdate} onClick={hendelUpdate}>
                            Update Setting
                    </Button>
                    </form>
                    <hr />
                    <Button variant="contained" color="secondary" size="large" onClick={hendelExit} className={classes.btnExit}>
                        Or click here to logout
                </Button>
                </Container>
    )
}

const mapStateToProps = (state) => {
    const { image, username, bio, email, createdAt, id, token } = state.user;
    return {
        token,
        image,
        username,
        bio,
        email,
        createdAt,
        id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogOut: () => dispatch(userLoginOut()),
        onUserUpdata: (user) => dispatch(userUpdata(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);