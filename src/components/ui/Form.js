import React from 'react';

const Form = (props) => {

    return (
        <form className={props.className || ''} method={props.method} action={props.action || ''}>
            {props.children}
        </form>
    );
};

export default Form;