import React, { useState } from "react";

import ContentMainPage from "../../content-main-page";
import Footer from "../../footer/foter";
import Header from "../../header";
import HeaderTitle from "../../header-title";

const HomePage = () => {

    return (
        <>
            <Header />
            <HeaderTitle />
            <ContentMainPage />
            <Footer />
        </>
    )
}

export default HomePage;
