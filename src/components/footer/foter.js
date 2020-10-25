import React, { useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import CopyrightIcon from '@material-ui/icons/Copyright';

const useStyles = makeStyles((theme) => ({
    test:{
        boxSizing: "inherit"
    },
    containerFoot:{
        background: "#f3f3f3",
        marginTop: "3rem",
        padding: "1rem 0",
        /* position: "absolute",
        bottom: "0",
        width: "100%", */
    },
    root: {
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "15px",
        paddingRight: "15px",
       /* display: "flex",
       justifyContent: "center",
       alignItems: "center",
       height: "50px",
       backgroundColor: "#ededed",
       fontSize: "15px",
       color: "grey",
       marginTop: theme.spacing(3), */
       /* position: "absolute",
       bottom: 0,
       width: "100%" */
   },
   linkFooter:{
       fontWeight: 700,
       color: "green",
       paddingRight: theme.spacing(2),
   },
   iconCopyr:{
       fontSize: "15px"
   }
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <>
        <div className={classes.test}>
            <div className={classes.containerFoot}>
                <div className={classes.root}>
                    <Link component={RouterLink} to="/" className={classes.linkFooter}>
                        Diploma
                    </Link>
                    <Typography>
                        <CopyrightIcon className={classes.iconCopyr} /> 2020. Diploma at the end of the course React in ORmedia.
                    </Typography>
                </div>
            </div>
        </div>
        </>
    )
}

export default Footer;