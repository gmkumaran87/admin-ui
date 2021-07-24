import React from "react";
import { useRef } from "react";

const Input = ({ id, value }) => {
  const inputRef = useRef();

  const newId = `nameEdit-${id}`;

  console.log(id, value);
  return (
    <>
      <input
        ref={inputRef}
        type="text"
        id={newId}
        value={value}
        className="editInput"
        name="nameEdit"
      />
    </>
  );
};

export default Input;
