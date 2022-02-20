import React from 'react';

const Input = (props) => {

    return (
        <div className={props.className || ''}>
            <label htmlFor={props.id || ''}>
                {props.labelText}
            </label>

            <input 
                id={props.id || ''}
                name={props.name || ''} 
                value={props.inputValue || ''}
                placeholder={props.placeholder || ''}
            >
            </input>
        </div>
    );
};

export default Input;