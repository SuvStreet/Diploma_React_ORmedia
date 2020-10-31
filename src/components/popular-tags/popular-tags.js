import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Container, Typography, CircularProgress } from "@material-ui/core";

import { API } from "../../services/requst";
import { connect } from "react-redux";
import { popularTags } from "../../actions/actions";

const useStyles = makeStyles(() => ({
    popularTag: {
        backgroundColor: "#ededed",
        borderRadius: 5,
        paddingBottom: 10,
        position: "sticky",
        top: "2em",
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

const PopularTags = ({ onPopularTags }) => {
    const classes = useStyles();

    const [popularTags, setPopularTags] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const tags = await API.get(`https://conduit.productionready.io/api/tags`);
            setPopularTags(tags.data.tags);
        }
        fetchData();
    }, []);

    const hendlePopularTag = async (tag) => {
        onPopularTags(3, tag);
    }

    return (
        <Container className={classes.popularTag}>
            <Typography variant="h6">Popular Tags</Typography>
            {popularTags === null
                ? <CircularProgress />
                : popularTags.map((i, index) => (<Chip label={`#${popularTags[index]}`} className={classes.customChip} key={index} onClick={() => hendlePopularTag(popularTags[index])} />))}
        </Container>
    )
}

const mapDispathToProps = (dispatch) => {
    return {
        onPopularTags: (tab, tag) => dispatch(popularTags(tab, tag))
    }
}

export default connect(null, mapDispathToProps)(PopularTags);