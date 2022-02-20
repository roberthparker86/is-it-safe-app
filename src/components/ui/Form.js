import React from 'react';

const Form = (props) => {

    return (
        <form className={props.className || ''} method='POST' action={props.action || ''}>
            {props.children}
        </form>
    );
};

export default Form;