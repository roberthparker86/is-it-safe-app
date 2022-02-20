import React from "react";

const H1 = (props) => {

    return (
        <h1 className={props.className || ''}>
            {props.children}
        </h1>
    );
};

export default H1;