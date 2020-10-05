import React from "react";

import s from "./HeaderTitle.module.sass"

const HeaderTitle = () => {
    return (
        <div className={s.headerTitle}>
            <h1>Diploma</h1>
            <p>A place to share your React knowledge.</p>
        </div>
    )
}

export default HeaderTitle;