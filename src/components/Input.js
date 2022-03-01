import React from 'react';

const Input = (props) => {
    const {
        className,
        labelText,
        id,
        name,
        inputValue,
        placeholder,
        onChange
    } = props;

    return (
        <div className={ className || '' }>
            <label htmlFor={ id || '' }>
                { labelText }
            </label>

            <input 
                id={ id || '' }
                name={ name || '' } 
                value={ inputValue || '' }
                placeholder={ placeholder || '' }
                onChange={ onChange }
            >
            </input>
        </div>
    );
};

export default Input;