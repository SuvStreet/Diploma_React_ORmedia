import React from "react";
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PopularTags from "../popular-tags";
import TabPanelProject from "../tab-panel-project";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  }
}));

const ContentMainPage = () => {

  const classes = useStyles();

  return (
    <>
      <Container maxWidth='lg' className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={9} xs={12}>
            <TabPanelProject
              tabLabelOne={"Your Feed"}
              tabLabelTwo={"Global Feed"}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <PopularTags />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ContentMainPage;