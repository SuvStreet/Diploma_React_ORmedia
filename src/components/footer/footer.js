import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import CopyrightIcon from '@material-ui/icons/Copyright';

const useStyles = makeStyles((theme) => ({
    containerFoot: {
        background: "#f3f3f3",
        marginTop: theme.spacing(2),
        padding: "1rem 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "0 0 auto"
    },
    linkFooter: {
        fontWeight: "bold",
        color: "green",
        paddingRight: theme.spacing(2),
    },
    iconCopyr: {
        fontSize: "15px"
    }
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.containerFoot}>
                <Link component={RouterLink} to="/" className={classes.linkFooter}>
                    Diploma
                    </Link>
                <Typography>
                    <CopyrightIcon className={classes.iconCopyr} /> 2020. Diploma at the end of the course React in ORmedia.
                </Typography>
            </div>
        </>
    )
}

export default Footer;