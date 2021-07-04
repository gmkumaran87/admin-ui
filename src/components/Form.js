import React from "react";
import "./Form.css";
import { useGlobalContext } from "../context/Context";

function Form() {
  const { userList, filterUsers, inputValue, setInputValue } =
    useGlobalContext();

  const handleOnchange = (e) => {
    const input = e.target.value;

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

    console.log(`filteredList`, filteredList);
    filterUsers(filteredList);

    setInputValue(input);
  };
  return (
    <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
      <h2> Admin UI </h2>{" "}
      <div className="form-control">
        <input
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
