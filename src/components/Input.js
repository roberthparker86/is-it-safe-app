import React from 'react';

const Input = props => {
  const { className, labelText, id, inputValue, placeholder, onChange } = props;

  return (
    <div className={className || ''}>
      <label htmlFor={id || ''}>{labelText}</label>

      <input
        type={props.type ? props.type : 'text'}
        id={id || ''}
        name={id || ''}
        value={inputValue || ''}
        placeholder={placeholder || ''}
        onChange={onChange}
        ></input>
    </div>
  );
};

export default Input;
