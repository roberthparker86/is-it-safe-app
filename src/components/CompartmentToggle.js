import React from 'react';

export const CompartmentToggle = props => (
  <section className="compartment-toggle">
    <button
      id="refrigerator"
      className={
        props.displayedCompartment === 'refrigerator'
          ? 'btn btn-primary active'
          : 'btn btn-primary'
      }
      onClick={e => {
        e.preventDefault();
        props.setDisplayedCompartment(e.target.id);
      }}>
      Refrigerator
    </button>

    <button
      id="freezer"
      className={
        props.displayedCompartment === 'freezer' ? 'btn btn-primary active' : 'btn btn-primary'
      }
      onClick={e => {
        e.preventDefault();
        props.setDisplayedCompartment(e.target.id);
      }}>
      Freezer
    </button>
  </section>
);
