import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Container, Typography, CircularProgress } from "@material-ui/core";

import { fetchPopularTags } from "../../services/requst";

const useStyles = makeStyles(() => ({
    popularTag: {
        backgroundColor: "#ededed",
        borderRadius: 5,
        paddingBottom: 10
    },
    customChip: {
        backgroundColor: "#5f5f5f",
        color: "white",
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
        cursor: "pointer",
    }
}));

const PopularTags = () => {
    const classes = useStyles();

    const [popularTags, setPopularTags] = useState("");

    useEffect(() => {
        fetchPopularTags().then((res) => {
            setPopularTags(res);
        })
    }, []);

    return (
        <Container className={classes.popularTag}>
            <Typography variant="h6">Popular Tags</Typography>
            {popularTags.tags === undefined
                ? <CircularProgress />
                : popularTags.tags.map((i, index) => (<Chip label={popularTags.tags[index]} className={classes.customChip} key={index} />))}
        </Container>
    )
}

export default PopularTags;