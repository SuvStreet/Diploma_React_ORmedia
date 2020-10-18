import { Card, CardHeader, Avatar, makeStyles, CardContent, Typography, IconButton, Chip, Link } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';
import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { FormatData } from "../format-date";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        marginTop: theme.spacing(1)
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const CardArticle = ({ props }) => {
    const classes = useStyles();

    const handleAtributArticle = () => {
        //console.log("###: this.props", props.slug);
        localStorage.setItem('slug', props.slug);
    }

    //console.log("###: this.props", props);
    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={props.author.image} className={classes.avatar} />
                    }
                    action={
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                            {props.favoritesCount}
                        </IconButton>
                    }
                    title={props.author.username}
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
                        <Link component={RouterLink} to="/article" onClick={handleAtributArticle}>
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