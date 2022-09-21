import React from 'react';

export const ItemCard = props => {
  const { remainingTime, user, id, status, name, compartment, handleDelete} = props;

  return (
    <div className="grid__column" key={id} id={id}>
      <div className={'grid__card ' + status}>
        <h2>{remainingTime}</h2>
        <h3 className="text-green">{status}</h3>
        <h4>{name}</h4>
        <button
          className="grid__card--close-btn"
          onClick={() => handleDelete({
            userId: user.id,
            foodId: id,
            compartment
          })}>
          <i className="fas fa-times fa-2x"></i>
        </button>
      </div>
    </div>
  );
}
