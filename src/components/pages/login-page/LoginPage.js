import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';

import { API, fetchAPI } from '../../../services/requst/requsts';

import s from "./LoginPage.module.sass"
import { connect } from 'react-redux';
import { userLoginIn } from '../../../actions/actions';

const LoginPage = ({ onLogIn, username, image }) => {

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
        //onLogIn(userData.data.user.image, userData.data.user.username);
        onLogIn(userData.data.user);
        localStorage.setItem('diplomaToken', userData.data.user.token);
        setIsLogin(true);
    }

    const render = () => {
        return (
            <div className={s.paper}>
                <Avatar className={s.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={s.form} noValidate /* onSubmit={onLogIn} */>
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
                        className={s.submit}
                        disabled={emailValue && pasValue !== "" ? false : true}
                        onClick={hendleAutorithation}
                    >
                        Sign In
                        </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }

    return (
        <Container component="main" maxWidth="xs">
            {localStorage.getItem('diplomaToken')
                ? <Redirect to="/" />
                : render()}
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        image: state.image,
        username: state.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogIn: (image, username) => dispatch(userLoginIn(image, username)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);