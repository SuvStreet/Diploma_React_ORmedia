import React, { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Avatar, Button, TextField, Link, Typography, Container } from '@material-ui/core';
import { connect } from 'react-redux';

import { API } from '../../../services/requst/requsts';

const useStyles = makeStyles((theme) => ({
    styleMainContainer: {
        flex: "1 0 auto",
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "green",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: "24px 0px 16px",
    },
    rootErrors: {
        color: "red",
        fontWeight: "bold",
        marginTop: theme.spacing(1)
    }
}));

const SignUp = ({ token }) => {
    const classes = useStyles();

    const [lastNameValue, setLastNameValue] = useState(undefined);
    const [emailAdressValue, setEmailAdressValue] = useState(undefined);
    const [passwordValue, setPasswordValue] = useState(undefined);
    const [isLogin, setIsLogin] = useState(false);
    const [errorEmail, setErrorEmail] = useState(undefined);
    const [errorPassword, setErrorPassword] = useState(undefined);
    const [errorUserame, setErrorUserame] = useState(undefined);

    const hendelRegistration = async (e) => {
        e.preventDefault();
        const registrationUser = await API.post(`https://conduit.productionready.io/api/users`, {
            user: {
                email: emailAdressValue,
                password: passwordValue,
                username: lastNameValue,
            }
        }).catch(error => {
            if (error.request) {
                //console.log("###: erorrs", error.request.response.errors)
                const { email, password, username } = error.request.response.errors
                console.log("###: email", email);
                console.log("###: password", password);
                console.log("###: username", username);
                setErrorEmail(email);
                setErrorPassword(password);
                setErrorUserame(username);
            }
        });
        if (registrationUser) {
            const { user: { token } } = registrationUser.data;
            localStorage.setItem('diplomaToken', token);
            setIsLogin(true);
        }
    }

    const errorsRender = () => {
        return (
            <Container className={classes.rootErrors} >
                <Typography variant="subtitle2" gutterBottom>
                    {errorEmail !== undefined
                        ? `* email ${errorEmail[0]}`
                        : null}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    {errorPassword !== undefined
                        ? `* password ${errorPassword[0]}`
                        : null}
                </Typography>
                <Typography variant="subtitle2">
                    {errorUserame !== undefined
                        ? `* username ${errorUserame}`
                        : null}
                </Typography>
            </Container>
        )
    }

    const render = () => {
        return (
            <Container component="main" maxWidth="xs" className={classes.styleMainContainer}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {errorsRender()}
                    <form className={classes.form} noValidate onSubmit={hendelRegistration}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Username"
                                    autoComplete="name"
                                    autoFocus
                                    onChange={(e) => setLastNameValue(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    autoComplete="email"
                                    onChange={(e) => setEmailAdressValue(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    autoComplete="password"
                                    onChange={(e) => setPasswordValue(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={lastNameValue && emailAdressValue && passwordValue ? false : true}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link component={RouterLink} to={`/login`} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container >
        )
    }

    return (
        token
            ? <Redirect to="/" />
            : isLogin
                ? <Redirect to="/" />
                : render()
    )
}

const mapStateToProps = (state) => {
    const { token } = state.user
    return {
        token,
    }
}

export default connect(mapStateToProps, null)(SignUp);