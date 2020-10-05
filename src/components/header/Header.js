import React, { Component } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { Link } from 'react-router-dom';

import s from "./Header.module.sass"

class Header extends Component {
    render() {
        return (
            <div className={s.headerWrapper}>
                <Link to="/">
                    <Button className={s.logo}>diploma</Button>
                </Link>
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
            </div>
        )
    }
}

export default Header;