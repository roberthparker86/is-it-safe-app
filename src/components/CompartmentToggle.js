import React from 'react';

export const CompartmentToggle = props => (
  <section className="compartment-toggle">
    <button
      id="refrigerator"
      className={
        props.activeBtn === 'refrigerator'
          ? 'btn btn-primary active'
          : 'btn btn-primary'
      }
      onClick={e => {
        e.preventDefault();
        props.setActiveBtn(e.target.id);
      }}>
      Refrigerator
    </button>

    <button
      id="freezer"
      className={
        props.activeBtn === 'freezer' ? 'btn btn-primary active' : 'btn btn-primary'
      }
      onClick={e => {
        e.preventDefault();
        props.setActiveBtn(e.target.id);
      }}>
      Freezer
    </button>
  </section>
);
