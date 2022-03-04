import React from 'react';

const Button = (props) => {

    const { id, type, onClick, className, href, children } = props;

    return (
        <button id={id} type={type || ''} onClick={onClick || ''} className={className} href={href || ''}>
            {children}
        </button>
    );
};

export default Button;