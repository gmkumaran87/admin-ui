import React from "react";
import { useState } from "react";
import { useGlobalContext } from "../context/Context";

const Input = ({ id, idValue, value }) => {
  const { updateUser } = useGlobalContext();

  const [name, setName] = useState(value);

  const handleChange = (e) => {
    const input = e.target.value;
    setName(input);
  };

  const keyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    const [newName, newEmail, newRole] = [
      document.getElementById(`nameEdit-${id}`),
      document.getElementById(`emailEdit-${id}`),
      document.getElementById(`roleEdit-${id}`),
    ];
    let newUser = { id: "", name: "", email: "", role: "" };

    if (event.key === "Enter") {
      newUser["id"] = id;
      newUser["name"] = newName.value;
      newUser["email"] = newEmail.value;
      newUser["role"] = newRole.value;

      updateUser(newUser);
    }
  };
  return (
    <>
      <input
        type="text"
        id={idValue}
        value={name}
        className="editInput"
        name="nameEdit"
        onChange={handleChange}
        onKeyDown={keyPress}
      />
    </>
  );
};

export default Input;
