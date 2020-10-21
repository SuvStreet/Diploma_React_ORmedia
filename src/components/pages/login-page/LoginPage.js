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

const LoginPage = () => {

    const [emailValue, setEmailValue] = useState('');
    const [pasValue, setPasValue] = useState('');

    const [isLogin, setIsLogin] = useState(false);

    const handleEmail = (event) => {
        setEmailValue(event.target.value);
        //console.log("####: email", emailValue);
    };

    const handlePassword = (event) => {
        setPasValue(event.target.value);
        //console.log("####: pas", pasValue);
    };

    const hendleAutorithation = async (e) => {
        e.preventDefault();
        /* fetchAPI(emailValue, pasValue).then(data => {
            if (data.errors) {
                console.log("####: dataError", data);
            }
            else if (data.user) {
                //localStorage.setItem('diplomaToken', userData.data.user.token);
                setLoggedIn(true);
                console.log("####: data", data);
            }
        }) */
        /* try { */
        let userData = await API.post("https://conduit.productionready.io/api/users/login", {
            user: {
                email: emailValue,
                password: pasValue,
            }
        });
        localStorage.setItem('diplomaToken', userData.data.user.token);
        localStorage.setItem('diplomaUserImg', userData.data.user.image);
        localStorage.setItem("diplomaUsername", userData.data.user.username);
        setIsLogin(true);
        //console.log("####: data", userData);
        /* }
        catch (e) {
            //console.log(`😱 Axios request failed: ${e}`);
            console.log(`###: error`, e.message);
        } */
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
                <form className={s.form} noValidate>
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

export default LoginPage;