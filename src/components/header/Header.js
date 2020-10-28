import React, { useState } from "react";
import { Avatar, Button, ButtonGroup, makeStyles, Typography } from "@material-ui/core";
import { Link, withRouter } from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';

import s from "./Header.module.sass"
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    styleIcon: {
        fontSize: 13
    },
}));

const Header = ({username, image}) => {

    const classes = useStyles();

    const renderNoAutorisatiopn = () => {
        return (
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group" className={s.headerButtonGroup}>
                <Button>
                    <Link to="/login">Sign in</Link>
                </Button>
                <Button>
                    <Link to="/register">Sign up</Link>
                </Button>
            </ButtonGroup>
        )
    };

    const renderYesAutorisatiopn = () => {
        return (
            <>
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group" className={s.headerButtonGroup}>
                    <Button>
                        <Link to="/new_article">
                            <CreateIcon className={classes.styleIcon} /> New Article
                        </Link>
                    </Button>
                    <Button>
                        <Link to="/settings">
                            <SettingsIcon className={classes.styleIcon} /> Setting
                        </Link>
                    </Button>
                    <Button>
                        <Avatar alt="img" src={image} />
                        <Link to="/profile"  >
                            {username}
                        </Link>
                    </Button>
                </ButtonGroup>

            </>
        )
    };

    return (
        <div className={s.headerWrapper}>
            <Link to="/">
                <Button className={s.logo}>diploma</Button>
            </Link>
            {localStorage.getItem("diplomaToken") ? renderYesAutorisatiopn() : renderNoAutorisatiopn()}
        </div>
    )
}

const mapStateToProps = (state) => {
    const {image, username} = state.user;
    return {
        image: image,
        username: username
    };
};

export default connect(mapStateToProps, null)(Header);