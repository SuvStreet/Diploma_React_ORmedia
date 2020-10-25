import { Button, ButtonGroup, Chip, CircularProgress, Container, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader, Avatar } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';

import { fetchArticles } from "../../../services/requst";
import { FormatData } from "../../format-date";
import { withRouter } from "react-router-dom";
import AddComments from "../../add-comments/add-comments";
import { Height } from "@material-ui/icons";

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

const ArticlePage = ({ match }) => {
    const { id } = match.params;

    const classes = useStyles();

    const [data, setData] = useState(undefined);

    useEffect(() => {
        fetchArticles(id).then((res) => {
            setData(res.article);
        })
    }, []);
    
    return (
        <>
            {data === undefined
                ? <CircularProgress />
                : <>
                    <div className={classes.root} /* style={heightTest} */ >
                        <Container maxWidth="md">
                            <Typography variant="h3" className={classes.titleArticle}>{data.title}</Typography>
                            <CardHeader className={classes.card}
                                avatar={
                                    <Avatar aria-label="recipe" src={data.author.image} />
                                }
                                action={
                                    <ButtonGroup disableElevation variant="contained" color="primary" className={classes.btnGr}>
                                        <Button>
                                            <AddIcon />
                                            Unfollow wildantinker
                                        </Button>
                                        <Button>
                                            <FavoriteIcon />
                                            Follow TestingCypress ({data.favoritesCount})
                                        </Button>
                                    </ButtonGroup>}
                                title={
                                    <Typography className={classes.cardTitl}>
                                        {data.author.username}
                                    </Typography>}
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
                            ? data.tagList.map((tag, index) => <Chip label={tag} key={index} />)
                            : null}
                        <hr />

                        {localStorage.getItem("diplomaToken") ? <AddComments img={data.author.image} /> : null}
                    </Container>
                </>
            }
        </>
    )
}

export default withRouter(ArticlePage);