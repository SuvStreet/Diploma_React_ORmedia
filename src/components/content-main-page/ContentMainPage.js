import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Paper, Tabs, Tab, Box, Grid, CircularProgress, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";

import CardArticle from "../card-article/CardArticle";
import { fetchRequst } from "../../services/requst";
import PopularTags from "../popular-tags";

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

const ContentMainPage = () => {
  const classes = useStyles();
  const numberTab = localStorage.getItem("diplomaToken") ? 0 : 1;
  const [value, setValue] = useState(numberTab);

  const [isLogading, setIsLogading] = useState(true);
  const [data, setData] = useState("");
  const [nemberRequest, setNemberRequest] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchRequst(nemberRequest).then((res) => {
      setIsLogading(false);
      setData(res);
    })
  }, [setIsLogading, setData, nemberRequest]);

  const onNumberPage = (e, value) => {
    setIsLogading(true);
    setNemberRequest(value * 10 - 10);
    setPage(value);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container maxWidth='lg' className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={9} xs={12}>
            <Paper>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Your Feed" {...a11yProps(0)} />
                <Tab label="Global Feed" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                {localStorage.getItem("diplomaToken")
                  ? <Typography>Item one</Typography>
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
            </Paper>
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

export default ContentMainPage;



/* const FetchRequst = async () => {
    const res = await fetch("https://conduit.productionready.io/api/articles?limit=10&amp;offset=10.")
    const body = await res.json();
    return body;
} */

/* class ContentMainPage extends Component {
  state = {
    isLogading: true,
    data: "",
    prev: 10,
  };

  fetchRequst = async (numberPage) => {
    const res = await fetch(
      `https://conduit.productionready.io/api/articles?limit=10&amp;offset=${numberPage}.`
    );
    const body = await res.json();
    return body;
  };

  componentDidMount() {
    //console.log("###: didMount1");
    this.fetchRequst(this.state.prev).then((res) =>
      this.setState({
        data: res,
        isLogading: false,
      })
    );
    console.log("###: state", this.state);
    //console.log("###: didMount2");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.prev !== prevState.prev) {
      this.fetchRequst(this.state.prev).then((res) =>
        this.setState({
          isLogading: false,
          data: res,
        })
      );
    }
  }

  onPageNext = () => {
    //alert(23);
    this.setState(({ prev }) => {
      return {
        isLogading: true,
        prev: prev + 10,
      }
    });
  };

  render() {
    const { isLogading } = this.state;
    const {
      data: { articles },
    } = this.state;

    if (isLogading) {
      return (
        <Container fixed>
          <CircularProgress />
        </Container>
      );
    }
    //console.log("###: state", this.state);
    //console.log("###: didMount3");
    return (
      <>
        <Container fixed>
          {articles !== undefined
            ? articles.map((i, index) => (
              <CardArticle props={articles[index]} key={index} />
            ))
            : null}
          <Pagination
            count={50}
            onChange={this.onPageNext}
          />
        </Container>
      </>
    );
  }
} */