import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Tabs, Tab, Box, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CardArticle from "../card-article/card-article";
import { API } from "../../services/requst";
import { popularTagsFocusLost } from "../../actions/actions";

const useStyles = makeStyles((theme) => ({
  pagin: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  root: {
    marginTop: 20,
  },
  emptiness: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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

const TabPanelProject = ({ onClickTabs, tabLabelOne, tabLabelTwo, usernameUser, tag, tab, token }) => {

  const classes = useStyles();

  const numberTab = token ? 0 : 1;

  const [value, setValue] = useState(numberTab);
  const [isLogading, setIsLogading] = useState(true);
  const [data, setData] = useState("");
  const [numberRequest, setNumberRequest] = useState(0);
  const [page, setPage] = useState(1);
  const [articlesCount, setArticlesCount] = useState("");
  const [redirectPage, setRedirectPage] = useState(false);

  useEffect(() => {
    switch (value) {
      case 0:
        setData("");
        if (tabLabelOne === "My Posts") {
          const tabOne = async () => {
            const dataTabLabelOne = await API.get(`https://conduit.productionready.io/api/articles?author=${usernameUser}&limit=10&offset=${numberRequest}`);
            if (dataTabLabelOne) {
              setIsLogading(false);
              setData(dataTabLabelOne.data);
              setArticlesCount(dataTabLabelOne.data.articlesCount);
            }
          }
          tabOne();
        }
        else if (tabLabelOne === "Your Feed") {
          const tabOne = async () => {
            API.defaults.headers.common['Authorization'] = `Token ${token}`;
            const dataTabLabelOne = await API.get(`https://conduit.productionready.io/api/articles/feed?limit=10&offset=${numberRequest}`);
            setIsLogading(false);
            setData(dataTabLabelOne.data);
            setArticlesCount(dataTabLabelOne.data.articlesCount);
            onClickTabs();
          }
          tabOne();
        }
        break;
      case 1:
        setData("");
        if (tabLabelTwo === "Favorited Posts") {
          const tabTwo = async () => {
            const dataTabLabelTwo = await API.get(`https://conduit.productionready.io/api/articles?favorited=${usernameUser}&limit=10&offset=${numberRequest}`);
            if (dataTabLabelTwo) {
              setIsLogading(false);
              setData(dataTabLabelTwo.data);
              setArticlesCount(dataTabLabelTwo.data.articlesCount);
            }
          }
          tabTwo();
        }
        else if (tabLabelTwo === "Global Feed") {
          const tabTwo = async () => {
            const dataTabLabelTwo = await API.get(`https://conduit.productionready.io/api/articles?limit=10&amp;offset=${numberRequest}.`);
            setIsLogading(false);
            setData(dataTabLabelTwo.data);
            setArticlesCount(dataTabLabelTwo.data.articlesCount);
            onClickTabs();
          }
          tabTwo();
        }
        break;
      case 2:
        setData("");
        const tabThree = async () => {
          const dataTabLabelThree = await API.get(`https://conduit.productionready.io/api/articles?tag=${tag}&limit=10&offset=${numberRequest}`);
          setIsLogading(false);
          setData(dataTabLabelThree.data);
          setArticlesCount(dataTabLabelThree.data.articlesCount);
        }
        tabThree();
    }
  }, [setIsLogading, setData, numberRequest, value]);

  const handleNumberPage = (e, value) => {
    if (page !== value) {
      setIsLogading(true);
      setNumberRequest(value * 10 - 10);
      setPage(value);
    }
  }

  const handleChange = (event, newValue) => {
    if (newValue !== value) {
      if (token || newValue !== 0) {
        setValue(newValue);
        setPage(1);
        setNumberRequest(0);
        setIsLogading(true);
      }
      else {
        setRedirectPage(true);
      }
    }
  };

  return (
    <>
      {redirectPage ? <Redirect to="/login" /> : null}
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label={tabLabelOne} {...a11yProps(0)} />
        <Tab label={tabLabelTwo} {...a11yProps(1)} />
        {tab === 3
          ? <Tab label={`#${tag}`} {...a11yProps(2)} />
          : null}
      </Tabs>
      <hr />
      <TabPanel value={value} index={0}>
        {isLogading
          ? <CircularProgress />
          : data.articles !== undefined
            ? articlesCount !== 0
              ? data.articles.map((i, index) => (<CardArticle props={data.articles[index]} key={index} />))
              : <Typography variant="subtitle2" className={classes.emptiness}>No articles are here... yet.</Typography>
            : null
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        {isLogading
          ? <CircularProgress />
          : data.articles !== undefined
            ? articlesCount !== 0
              ? data.articles.map((i, index) => (<CardArticle props={data.articles[index]} key={index} />))
              : <Typography variant="subtitle2" className={classes.emptiness}>No articles are here... yet.</Typography>
            : null
        }
      </TabPanel>
      <TabPanel value={value} index={2}>
        {isLogading
          ? <CircularProgress />
          : data.articles !== undefined
            ? articlesCount !== 0
              ? data.articles.map((i, index) => (<CardArticle props={data.articles[index]} key={index} />))
              : <Typography variant="subtitle2" className={classes.emptiness}>No articles are here... yet.</Typography>
            : null
        }
      </TabPanel>
      {articlesCount < 11
        ? null
        : <Pagination
          count={(Math.ceil(articlesCount / 10))}
          page={page}
          onChange={handleNumberPage}
          className={classes.pagin}
        />}
    </>
  );

}

const mapStateToProps = (state) => {
  const { token } = state.user;
  const { tab, tag } = state.articlePopularTags;
  return {
    token,
    tab,
    tag,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickTabs: () => dispatch(popularTagsFocusLost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabPanelProject);