import React, { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { connect } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { makeStyles, Avatar, Container, Button, TextField, Link, Grid, Typography } from '@material-ui/core';

import { API } from '../../../services/requst';
import { userLoginIn } from '../../../actions/actions';

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: "16px 0px 16px"
    }
}));

const LoginPage = ({ onLogIn, token }) => {
    const classes = useStyles();

    const [emailValue, setEmailValue] = useState('');
    const [pasValue, setPasValue] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    const handleEmail = (event) => {
        setEmailValue(event.target.value);
    };

    const handlePassword = (event) => {
        setPasValue(event.target.value);
    };

    const hendleAutorithation = async (e) => {
        e.preventDefault();
        let userData = await API.post("https://conduit.productionready.io/api/users/login", {
            user: {
                email: emailValue,
                password: pasValue,
            }
        });
        onLogIn(userData.data.user);
        localStorage.setItem("diplomaToken", userData.data.user.token);
        setIsLogin(true);
    }

    const render = () => {
        return (
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate /* onSubmit={onLogIn} */>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={emailValue}
                        onChange={handleEmail}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={pasValue}
                        onChange={handlePassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={emailValue && pasValue ? false : true}
                        onClick={hendleAutorithation}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to={`/register`} variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.styleMainContainer}>
            {token
                ? <Redirect to="/" />
                : isLogin
                    ? <Redirect to="/" />
                    : render()
            }
        </Container>
    );
}

const mapStateToProps = (state) => {
    const { token } = state.user
    return {
        token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogIn: (user) => dispatch(userLoginIn(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);