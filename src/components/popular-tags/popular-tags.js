import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Container, Typography, CircularProgress } from "@material-ui/core";

import { API, fetchPopularTags } from "../../services/requst";

const useStyles = makeStyles(() => ({
    popularTag: {
        backgroundColor: "#ededed",
        borderRadius: 5,
        paddingBottom: 10,
        /* position: "fixed", */
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

    const [popularTags, setPopularTags] = useState(null);

    async function fetchData() {
        const tags = await API.get(`https://conduit.productionready.io/api/tags`);
        setPopularTags(tags.data.tags);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container className={classes.popularTag}>
            <Typography variant="h6">Popular Tags</Typography>
            {popularTags === null
                ? <CircularProgress />
            : popularTags.map((i, index) => (<Chip label={`#${popularTags[index]}`} className={classes.customChip} key={index} />))}
        </Container>
    )
}

export default PopularTags;