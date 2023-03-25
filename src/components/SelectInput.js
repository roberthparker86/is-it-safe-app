import React, { useState } from "react";

const SelectInput = props => {
  const {
    selectValue,
    updateSelectValue
  } = props;
  const [selectedOption, setSelectedOption] = useState("refrigerator");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  if (selectValue !== selectedOption) {
    console.log(selectedOption);
    updateSelectValue(selectedOption);
  }

  return (
    <>
      <label htmlFor="compartment">Refrigerator or freezer?</label>
    
      <select name="compartment" className="add-food__select" id="compartment" value={selectedOption} onChange={handleChange}>
        <option value="refrigerator">Refrigerator</option>
        <option value="freezer">Freezer</option>
      </select>
    </>
  );
}

export default SelectInput;