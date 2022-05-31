import React from 'react';

export const ItemCard = props => (
  <div className="grid__column" key={props.id} id={props.id}>
    <div className={'grid__card ' + props.status}>
      <h2>{props.remainingTime}</h2>
      <h3 className="text-green">{props.status}</h3>
      <h4>{props.name}</h4>
      <button
        className="grid__card--close-btn"
        onClick={() => props.handleDelete(props.id)}>
        <i className="fas fa-times fa-2x"></i>
      </button>
    </div>
  </div>
);
