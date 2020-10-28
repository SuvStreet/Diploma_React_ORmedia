import { Card, CardHeader, Avatar, makeStyles, CardContent, Typography, IconButton, Chip, Link, Button } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { FormatData } from "../format-date";
import { API } from "../../services/requst";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        marginTop: theme.spacing(1)
    },
    btnFavorite: {
        color: "grey",
        transition: "0.5s",
        "&:hover": {
            color: "green",
            border: "1px solid green",
            transition: "0.5s",
        },
    },
    btnFavoriteActive: {
        color: "green",
        transition: "0.5s",
        "&:hover": {
            border: "1px solid green",
            transition: "0.5s",
        },
    },
    linkStyleProfile: {
        color: "green",
        cursor: "pointer",
        fontWeight: "bold",
    }
}));

const CardArticle = ({ props }) => {

    const classes = useStyles();

    //console.log("###: this.props", props);

    const [favoritedArticle, setFavoritedArticle] = useState("");
    const [countFavoritedArticle, setCountFavoritedArticle] = useState("");

    useEffect(() => {
        setFavoritedArticle(props.favorited);
        setCountFavoritedArticle(props.favoritesCount);
    }, [setFavoritedArticle, setCountFavoritedArticle])

    const hendelFavorite = async () => {
        if (favoritedArticle) {
            const unFavorite = await API.delete(`https://conduit.productionready.io/api/articles/${props.slug}/favorite`);
            const { favorited, favoritesCount } = unFavorite.data.article;
            setFavoritedArticle(favorited);
            setCountFavoritedArticle(favoritesCount);
        }
        else {
            const favorite = await API.post(`https://conduit.productionready.io/api/articles/${props.slug}/favorite`);
            const { favorited, favoritesCount } = favorite.data.article;
            setFavoritedArticle(favorited);
            setCountFavoritedArticle(favoritesCount);
        }
    }

    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={props.author.image} />
                    }
                    action={
                        <Button
                            startIcon={<FavoriteIcon />}
                            variant="outlined"
                            size="medium"
                            className={favoritedArticle ? classes.btnFavoriteActive : classes.btnFavorite}
                            onClick={hendelFavorite}
                        >
                            {countFavoritedArticle}
                        </Button>
                    }
                    title={
                        <Link
                            component={RouterLink}
                            to={`/profile/${props.author.username}`}
                            className={classes.linkStyleProfile}
                        >
                            {props.author.username}
                        </Link>
                    }
                    subheader={FormatData(props.createdAt)}
                />
                <CardContent>
                    <Typography variant="h5">
                        {props.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.description}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        <Link component={RouterLink} to={`/article/${props.slug}`}>
                            Read more...
                        </Link>
                    </Typography>
                    {props.tagList.length !== 0
                        ? props.tagList.map((tag, index) => <Chip label={tag} key={index} />)
                        : null}
                </CardContent>
            </Card>
        </>
    )
}



export default CardArticle;