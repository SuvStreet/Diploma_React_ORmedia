import React from "react";
import { Button, ButtonGroup, makeStyles, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';

import s from "./Header.module.sass"

const useStyles = makeStyles((theme) => ({
    styleIcon: {
        fontSize: 13
    },
}));

const Header = () => {
    const classes = useStyles();

    const renderNoAutorisatiopn = () => {
        return (
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group" className={s.headerButtonGroup}>
                <Button>
                    <Link to="/">Home</Link>
                </Button>
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
                        <Link to="/">Home</Link>
                    </Button>
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
                        <Link to="/user"  >
                            {localStorage.getItem("userDiploma")}
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

export default Header;