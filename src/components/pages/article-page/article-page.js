import { Button, Chip, CircularProgress, Container, Link, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader, Avatar } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import { API } from "../../../services/requst";
import { FormatData } from "../../format-date";
import { withRouter } from "react-router-dom";
import AddComments from "../../add-comments/add-comments";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#343434",
        color: "white",
    },
    titleArticle: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    card: {
        paddingTop: 0,
        paddingBottom: theme.spacing(2),
        paddingLeft: 0,
        paddingRight: 0,
        color: "white",
    },
    styleUsernameLink: {
        fontSize: "20px",
        color: "grey",
        textDecoration: "underline",
        transition: "0.5s",
        "&:hover": {
            color: "white",
            transition: "0.5s",
        },
    },
    cardSub: {
        color: "white",
        fontSize: "12px"
    },
    articleBody: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(5)
    },
    btnRoot: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: theme.spacing(35)
    },
    btnOne: {
        color: "grey",
        transition: "0.5s",
        marginBottom: theme.spacing(1),
        "&:hover": {
            color: "white",
            transition: "0.5s",
            border: "1px solid white",
        },
    },
    btnTwo: {
        color: "grey",
        transition: "0.5s",
        "&:hover": {
            color: "red",
            transition: "0.5s",
            border: "1px solid red",
        },
    },
    styleTag: {
        marginRight: theme.spacing(1),
    },
    linkEdit: {
        color: "grey",
        "&:hover": {
            color: "white",
            transition: "0.5s",
            textDecoration: "none",
        },
    },
    followStyleBtn: {
        color: "grey",
        marginBottom: theme.spacing(1),
        transition: "0.5s",
        "&:hover": {
            color: "white",
            transition: "0.5s",
            border: "1px solid white",
        },
    },
    followStyleBtnActive: {
        color: "white",
        marginBottom: theme.spacing(1),
        transition: "0.5s",
        "&:hover": {
            transition: "0.5s",
            border: "1px solid white",
        },
    },
    favoriteStyleBtn: {
        color: "grey",
        transition: "0.5s",
        "&:hover": {
            color: "green",
            transition: "0.5s",
            border: "1px solid green",
        },
    },
    favoriteStyleBtnActive: {
        color: "green",
        transition: "0.5s",
        "&:hover": {
            transition: "0.5s",
            border: "1px solid green",
        },
    },
    rootLinkLogReg: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    linkLogin: {
        color: "green",
        fontWeight: "bold",
        marginRight: theme.spacing(1),
    },
    linkRegister: {
        color: "green",
        fontWeight: "bold",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

const ArticlePage = ({ match, usernameAutorization, token }) => {
    const { id } = match.params;

    const classes = useStyles();

    const [data, setData] = useState(undefined);
    const [authorArticle, setAuthorArticle] = useState(undefined);
    const [followingAuthor, setFollowingAuthor] = useState(false);
    const [removeArticle, setRemoveArticle] = useState(false);
    const [favoritedArticle, setFavoritedArticle] = useState(false);
    const [countFavoritedArticle, setCountFavoritedArticle] = useState("");
    const [redirectPage, setRedirectPage] = useState(false);

    useEffect(() => {
        async function articleFetchData() {
            const artic = await API.get(`https://conduit.productionready.io/api/articles/${id}`);
            if (artic) {
                const { article, article: { favorited, favoritesCount, author: { username, following } } } = artic.data;
                setData(article);
                setAuthorArticle(username);
                setFollowingAuthor(following);
                setFavoritedArticle(favorited);
                setCountFavoritedArticle(favoritesCount);
            }
        }
        articleFetchData();
    }, [setFollowingAuthor, setFavoritedArticle, setCountFavoritedArticle, id]);

    const hendelRemoveArticle = async () => {
        await API.delete(`https://conduit.productionready.io/api/articles/${id}`);
        setRemoveArticle(true);
    }

    const hendelFollow_UnFollow = async () => {
        if (token) {
            if (followingAuthor) {
                const unFollow = await API.delete(`https://conduit.productionready.io/api/profiles/${authorArticle}/follow`);
                setFollowingAuthor(unFollow.data.profile.following);
            }
            else {
                const follow = await API.post(`https://conduit.productionready.io/api/profiles/${authorArticle}/follow`);
                setFollowingAuthor(follow.data.profile.following);
            }
        }
        else {
            setRedirectPage(true);
        }
    }

    const hendelFavorite = async () => {
        if (token) {
            if (favoritedArticle) {
                const unFavorite = await API.delete(`https://conduit.productionready.io/api/articles/${id}/favorite`);
                setFavoritedArticle(unFavorite.data.article.favorited);
                setCountFavoritedArticle(unFavorite.data.article.favoritesCount);
            }
            else {
                const favorite = await API.post(`https://conduit.productionready.io/api/articles/${id}/favorite`);
                setFavoritedArticle(favorite.data.article.favorited);
                setCountFavoritedArticle(favorite.data.article.favoritesCount);
            }
        }
        else {
            setRedirectPage(true);
        }
    }

    const yourArticleRender = () => {
        return (
            <div className={classes.btnRoot}>
                <Link component={RouterLink} to={`/edit_article/${id}`} className={classes.linkEdit}>
                    <Button variant="outlined" className={classes.btnOne} startIcon={<EditIcon />}>
                        Edit Article
                    </Button>
                </Link>
                <Button variant="outlined" startIcon={<DeleteIcon />} className={classes.btnTwo} onClick={hendelRemoveArticle}>
                    Delete Article
                </Button>
            </div>
        )
    }

    const notYourArticleRender = () => {
        //console.log("####: countFavoritedArticle", countFavoritedArticle);
        return (
            <div className={classes.btnRoot}>
                {redirectPage
                    ? <Redirect to="/login" />
                    :
                    <>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={followingAuthor ? classes.followStyleBtnActive : classes.followStyleBtn}
                            onClick={hendelFollow_UnFollow}
                        >
                            {followingAuthor ? `UnFollow ${authorArticle}` : `Follow ${authorArticle}`}
                        </Button>
                        <Button
                            variant="outlined"
                            className={favoritedArticle ? classes.favoriteStyleBtnActive : classes.favoriteStyleBtn}
                            startIcon={<FavoriteIcon />}
                            onClick={hendelFavorite}
                        >
                            Favorite Article ({countFavoritedArticle})
                        </Button>
                    </>
                }
            </div>
        )
    }

    return (
        <>
            {data === undefined
                ? <CircularProgress />
                : <>
                    <div className={classes.root}>
                        <Container maxWidth="md">
                            <Typography variant="h3" className={classes.titleArticle}>{data.title}</Typography>
                            <CardHeader className={classes.card}
                                avatar={
                                    <Avatar aria-label="recipe" src={data.author.image} />
                                }
                                action={
                                    usernameAutorization === authorArticle ? yourArticleRender() : notYourArticleRender()
                                }
                                title={
                                    <Link component={RouterLink} to={`/profile/${data.author.username}`} className={classes.styleUsernameLink}>
                                        {data.author.username}
                                    </Link>}
                                subheader={
                                    <Typography className={classes.cardSub}>
                                        {FormatData(data.createdAt)}
                                    </Typography>
                                }
                            />
                        </Container>
                    </div>
                    <Container maxWidth="md" >
                        <Typography variant="h5" className={classes.articleBody}>
                            {data.body}
                        </Typography>
                        {data.tagList.length !== 0
                            ? data.tagList.map((tag, index) => <Chip label={tag} key={index} className={classes.styleTag} />)
                            : null}
                        <hr />
                        {token
                            ? <AddComments slug={id} />
                            :
                            <div className={classes.rootLinkLogReg}>
                                <Link
                                    component={RouterLink}
                                    to={`/login`}
                                    className={classes.linkLogin}
                                >
                                    Sign in
                                </Link>
                                    or
                                <Link
                                    component={RouterLink}
                                    to={`/register`}
                                    className={classes.linkRegister}
                                >
                                    sign up
                                </Link>
                                    to add comments on this article.
                            </div>
                        }
                    </Container>

                    {removeArticle ? <Redirect to="/" /> : null}
                </>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    const { token, username } = state.user
    return {
        token,
        usernameAutorization: username,
    }
}

export default connect(mapStateToProps, null)(withRouter(ArticlePage));