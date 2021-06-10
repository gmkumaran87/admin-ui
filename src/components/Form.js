import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [inputValue, setInputValue] = useState("");

  const handleOnchange = (e) => {
    const input = e.target.value;

    setInputValue(input);
  };
  return (
    <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Admin UI</h2>
      <div className="form-control">
        <input
          type="text"
          className="admin-input"
          value={inputValue}
          onChange={handleOnchange}
          placeholder="Search by name, email or role"
        />
      </div>
    </form>
  );
}

export default Form;
