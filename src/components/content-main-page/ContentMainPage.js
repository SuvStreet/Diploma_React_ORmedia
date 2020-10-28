import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Paper, Tabs, Tab, Box, Grid, CircularProgress, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";
import { popularTagsFocusLost } from "../../actions/actions";
import { popularTags } from "../../actions/actions";

import CardArticle from "../card-article/CardArticle";
import { API, fetchFeedArticles, fetchRequst } from "../../services/requst";
import PopularTags from "../popular-tags";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  pagin: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  root: {
    marginTop: 20,
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ContentMainPage = ({ articlesPopTag, onClickTabs, tab, tag, onPopularTags }) => {
  const classes = useStyles();
  const numberTab = localStorage.getItem("diplomaToken") ? 0 : 1;
  const [value, setValue] = useState(numberTab);

  const [isLogading, setIsLogading] = useState(true);
  const [data, setData] = useState("");
  const [nemberRequest, setNemberRequest] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    switch (value) {
      case 0:
        if (localStorage.getItem("diplomaToken") !== null) {
          fetchFeedArticles(nemberRequest).then((res) => {
            setIsLogading(false);
            setData(res);
            onClickTabs();
          })
        }
        break;
      case 2:
        const articlePopTag = async () => {
          const article = await API.get(`https://conduit.productionready.io/api/articles?tag=${tag}&limit=10&offset=${nemberRequest}`);
          onPopularTags(article.data.articles, tab, tag);
          setIsLogading(false);
        }
        articlePopTag();
      default:
        fetchRequst(nemberRequest).then((res) => {
          setIsLogading(false);
          setData(res);
          onClickTabs();
        })
        break;
    }
  }, [setIsLogading, setData, nemberRequest, value]);

  const onNumberPage = (e, value) => {
    setIsLogading(true);
    setNemberRequest(value * 10 - 10);
    setPage(value);
  }

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
    setPage(1);
    setNemberRequest(0);
    setIsLogading(true);
  };

  /* console.log("###: articles", data.articles); */

  return (
    <>
      <Container maxWidth='lg' className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={9} xs={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Your Feed" {...a11yProps(0)} />
              <Tab label="Global Feed" {...a11yProps(1)} />
              <Tab label={`#${tag}`} {...a11yProps(2)} />
            </Tabs>
            <hr />
            <TabPanel value={value} index={0}>
              {localStorage.getItem("diplomaToken")
                ? isLogading
                  ? <CircularProgress />
                  : data.articles !== undefined
                    ? data.articles.map((i, index) => (<CardArticle props={data.articles[index]} key={index} />))
                    : null
                : <Redirect to="/login" />
              }
            </TabPanel>
            <TabPanel value={value} index={1}>
              {isLogading
                ? <CircularProgress />
                : data.articles !== undefined
                  ? data.articles.map((i, index) => (<CardArticle props={data.articles[index]} key={index} />))
                  : null
              }
            </TabPanel>
             <TabPanel value={value} index={2}>
                {isLogading
                  ? <CircularProgress />
                  : articlesPopTag !== ""
                    ? articlesPopTag.map((i, index) => (<CardArticle props={articlesPopTag[index]} key={index} />))
                    : null
                }
              </TabPanel>
          </Grid>
          <Grid item md={3} xs={12}>
            <PopularTags />
          </Grid>
        </Grid>
        <Pagination
          count={50}
          page={page}
          onChange={onNumberPage}
          className={classes.pagin}
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  const {articlesPopTag, tab, tag} = state.articlePopularTags
  return {
    articlesPopTag: articlesPopTag,
    tab: tab,
    tag: tag,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPopularTags: (article, tab, tag) => dispatch(popularTags(article, tab, tag)),
    onClickTabs: () => dispatch(popularTagsFocusLost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentMainPage);