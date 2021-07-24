import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "./Button";
import { useGlobalContext } from "../context/Context";

function TableList(props) {
  const { id, name, email, role } = props;
  const { loadSelectedUsers } = useGlobalContext();

  const handleClick = (e) => {
    loadSelectedUsers(e.currentTarget.value, e.currentTarget.checked);
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={id}
          id={`chckBox-${id}`}
          onChange={handleClick}
        />{" "}
      </td>{" "}
      <td id={`rowName-${id}`}> {name} </td>
      <td id={`rowEmail-${id}`}> {email} </td>
      <td id={`rowRole-${id}`}> {role} </td>
      <td>
        <Button className="edit-btn icons" text="edit" id={id}>
          <FaEdit />
        </Button>
        <Button className="icons delete-icon" text="delete" id={id}>
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
}

export default TableList;
