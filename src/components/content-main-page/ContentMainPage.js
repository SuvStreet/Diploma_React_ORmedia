import React from "react";

const FetchRequst = async() =>{
    const res = await fetch("https://conduit.productionready.io/api/articles?limit=10&amp;offset=0.")
    const body = await res.json();
    return body;
}

const ContentMainPage = () => {
    
    FetchRequst().then(res => console.log("###: res", res));
   
    return (
        <>

        </>
    )
}

export default ContentMainPage;