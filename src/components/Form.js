import React from 'react';

const Form = (props) => {

    const { className, method, action, children } = props;

    return (
        <form className={className || ''} method={method} action={action || ''}>
            {children}
        </form>
    );
};

export default Form;