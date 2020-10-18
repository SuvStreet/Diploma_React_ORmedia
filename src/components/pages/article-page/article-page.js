import { Button, ButtonGroup, CircularProgress, Container, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader, Avatar } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';

import { fetchArticles } from "../../../services/requst";
import { FormatData } from "../../format-date";

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
    cardTitl: {
        fontSize: "20px"
    },
    cardSub: {
        color: "white",
        fontSize: "12px"
    },
    btnGr: {
        paddingTop: theme.spacing(2)
    },
    articleBody: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(5)
    }
}));

const ArticlePage = () => {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [img, setImg] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        let slug = localStorage.getItem('slug');
        if (slug !== null) {
            fetchArticles(slug).then((res) => {
                setData(res.article);
                setImg(res.article.author.image);
                setAuthor(res.article.author.username);
                //localStorage.removeItem('slug');
            })
        }
    }, [])

    console.log("###: Data", data);

    return (
        <>
            {data === undefined
                ? <CircularProgress />
                : <div className={classes.root}>
                    <Container maxWidth="md">
                        <Typography variant="h3" className={classes.titleArticle}>{data.title}</Typography>
                        <CardHeader className={classes.card}
                            avatar={
                                <Avatar aria-label="recipe" src={img} />
                            }
                            action={
                                <ButtonGroup disableElevation variant="contained" color="primary" className={classes.btnGr}>
                                    <Button>
                                        <AddIcon />
                                        Follow TestingCypress
                                    </Button>
                                    <Button>
                                        <FavoriteIcon />
                                        Follow TestingCypress ({data.favoritesCount})
                                    </Button>
                                </ButtonGroup>}
                            title={
                                <Typography className={classes.cardTitl}>
                                    {author}
                                </Typography>}
                            subheader={
                                <Typography className={classes.cardSub}>
                                    {FormatData(data.createdAt)}
                                </Typography>
                            }
                        />
                    </Container>
                </div>
            }
            <Container maxWidth="md" >
                <Typography variant="h5" className={classes.articleBody}>
                    {data.body}
                </Typography>
                <hr />
            </Container>
           
        </>
    )
}

export default ArticlePage;