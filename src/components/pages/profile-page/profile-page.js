import { Avatar, Button, Container, Link, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link as RouterLink, Redirect } from 'react-router-dom';

import { API } from "../../../services/requst";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#ededed",
    },
    containerStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    usernameText: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        fontWeight: "bold"
    },
    followStyleBtn: {
        color: "grey",
        marginBottom: theme.spacing(1),
        transition: "0.5s",
        alignSelf: "flex-end",
        "&:hover": {
            color: "black",
            transition: "0.5s",
            border: "1px solid black",
        },
    },
    followStyleBtnActive: {
        color: "black",
        marginBottom: theme.spacing(1),
        transition: "0.5s",
        alignSelf: "flex-end",
        "&:hover": {
            transition: "0.5s",
            border: "1px solid black",
        },
    },
    rootEditProfSettingStyleBtn: {
        marginBottom: theme.spacing(1),
        transition: "0.5s",
        alignSelf: "flex-end",
        "&:hover": {
            textDecoration: "none",
        },
    },
    editProfSettingStyleBtn: {
        color: "grey",
        transition: "0.5s",
        "&:hover": {
            color: "black",
            transition: "0.5s",
            border: "1px solid black",
        },
    }
}));

const token = localStorage.getItem("diplomaToken");

const ProfilePage = ({ username, match }) => {
    const classes = useStyles();

    const { id } = match.params;

    //console.log("###: user", id);

    const [imageUser, setImageUser] = useState("");
    const [usernameUser, setUsernameUser] = useState("");
    const [bioUser, setBioUser] = useState("");
    const [followingAuthor, setFollowingAuthor] = useState(false);

    useEffect(() => {
        async function dataUser() {
            const user = await API.get(`https://conduit.productionready.io/api/profiles/${id}`);
            //console.log("###: user", user.data.profile);
            const { image, username, bio, following } = user.data.profile
            setImageUser(image);
            setUsernameUser(username);
            setBioUser(bio);
            setFollowingAuthor(following);
        }
        dataUser();
    }, [setFollowingAuthor]);

    const hendelFollow_UnFollow = async () => {
        if (followingAuthor) {
            const unFollow = await API.delete(`https://conduit.productionready.io/api/profiles/${id}/follow`);
            setFollowingAuthor(unFollow.data.profile.following);
        }
        else {
            const follow = await API.post(`https://conduit.productionready.io/api/profiles/${id}/follow`);
            setFollowingAuthor(follow.data.profile.following);
        }
    }

    const profileNotYourPage = () => {
        return (
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                className={followingAuthor ? classes.followStyleBtnActive : classes.followStyleBtn}
                onClick={hendelFollow_UnFollow}
            >
                {followingAuthor ? `UnFollow ${usernameUser}` : `Follow ${usernameUser}`}
            </Button>
        )
    }

    const profileYourPage = () => {
        return (
            <Link component={RouterLink} to={`/settings`} className={classes.rootEditProfSettingStyleBtn}>
                <Button
                    variant="outlined"
                    startIcon={<SettingsIcon />}
                    className={classes.editProfSettingStyleBtn}
                >
                    Edit Profile Settings
                </Button>
            </Link>
        )
    }

    return (
        <>
            {token === null
                ? <Redirect to="/" />
                : <div className={classes.root}>
                    <Container maxWidth="md" className={classes.containerStyle}>
                        <Avatar src={imageUser} className={classes.large} />
                        <Typography variant="h5" className={classes.usernameText}>{usernameUser}</Typography>
                        {bioUser !== null ? <Typography variant="h6" >{bioUser}</Typography> : null}
                        {username === usernameUser ? profileYourPage() : profileNotYourPage()}
                    </Container>
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    const { username } = state.user;
    return {
        username: username,
    }
}

export default connect(mapStateToProps, null)(ProfilePage);