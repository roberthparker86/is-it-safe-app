import React from 'react';

const Button = (props) => {

  <a id={props.id} className={props.className} href={props.href || ''}>
    {props.children}
  </a>
};

export default Button;