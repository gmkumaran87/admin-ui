import React from "react";
import { useRef } from "react";
import "./Form.css";
import { useGlobalContext } from "../context/Context";

function Form() {
  const { userList, filterUsers, inputValue, setInputValue } =
    useGlobalContext();

  const inputRef = useRef();

  const handleOnchange = (e) => {
    const input = e.target.value.toLocaleLowerCase();

    const filteredList = userList.filter((list) => {
      const name = list.name.toLocaleLowerCase();
      const email = list.email.toLocaleLowerCase();
      const role = list.role.toLocaleLowerCase();

      return (
        name.startsWith(input) ||
        email.startsWith(input) ||
        role.startsWith(input)
      );
    });
    console.log("Input Ref", inputRef.current.value);
    // Send the entered strin for filtering the User list and display the results
    filterUsers(filteredList);

    setInputValue(input);
  };
  return (
    <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
      <h2> Admin UI </h2>
      <div className="form-control">
        <input
          ref={inputRef}
          type="text"
          className="admin-input"
          value={inputValue}
          onChange={handleOnchange}
          placeholder="Search by name, email or role"
        />
      </div>{" "}
    </form>
  );
}

export default Form;
