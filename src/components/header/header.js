import React from "react";
import { Avatar, Button,  makeStyles, Link } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    headerWrapper:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "20px 30px 0 30px",
    },
    logo:{
        color: "green",
        fontWeight: "bold",
        fontSize: theme.spacing(4),
    },
    linkStyle: {
        "&:hover": {
            textDecoration: "none",
        },
    },
    BtnStyle: {
        color: "grey",
        transition: "0.5s",
        marginRight: theme.spacing(1),
        "&:hover": {
            color: "black",
            transition: "0.5s",
            border: "1px solid black",
        },
    },
    smallAva: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    styleIcon: {
        fontSize: 13,
    },
}));

const Header = ({ username, image, token }) => {
    const classes = useStyles();

    const renderNoAutorisatiopn = () => {
        return (
            <div>
                <Link component={RouterLink} to={`/login`} className={classes.linkStyle}>
                    <Button variant="outlined" className={classes.BtnStyle}>Sign in</Button>
                </Link>
                <Link component={RouterLink} to={`/register`} className={classes.linkStyle}>
                    <Button variant="outlined" className={classes.BtnStyle}>Sign up</Button>
                </Link>
            </div>
        )
    };

    const renderYesAutorisatiopn = () => {
        return (
            <>
                <div>
                    <Link component={RouterLink} to={`/new_article`} className={classes.linkStyle}>
                        <Button startIcon={<CreateIcon />} variant="outlined" className={classes.BtnStyle}>New Article</Button>
                    </Link>
                    <Link component={RouterLink} to={`/settings`} className={classes.linkStyle}>
                        <Button startIcon={<SettingsIcon />} variant="outlined" className={classes.BtnStyle}>Setting</Button>
                    </Link>
                    <Link component={RouterLink} to={`/profile/${username}`} className={classes.linkStyle}>
                        <Button startIcon={<Avatar alt="img" src={image} className={classes.smallAva} />} variant="outlined" className={classes.BtnStyle}>{username}</Button>
                    </Link>
                </div>
            </>
        )
    };

    return (
        <div className={classes.headerWrapper}>
            <Link component={RouterLink} to={`/`} className={classes.linkStyle}>
                <Button className={classes.logo}>diploma</Button>
            </Link>
            {token ? renderYesAutorisatiopn() : renderNoAutorisatiopn()}
        </div>
    )
}

const mapStateToProps = (state) => {
    const { image, username, token } = state.user;
    return {
        token,
        image,
        username
    };
};

export default connect(mapStateToProps, null)(Header);
