import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "./Button";
import { useGlobalContext } from "../context/Context";
import Input from "./Input";
import CheckBox from "./CheckBox";

function TableList(props) {
  const { id, name, email, role } = props;
  const { editUser } = useGlobalContext();

  const userId = editUser["id"];

  let [nameInp, emailInp, roleInp] = ["", "", ""];

  const [nameId, emailId, roleId] = [
    `rowName-${id}`,
    `rowEmail-${id}`,
    `rowRole-${id}`,
  ];

  const [nameInpId, emailInpId, roleInpId] = [
    `nameEdit-${id}`,
    `emailEdit-${id}`,
    `roleEdit-${id}`,
  ];

  if (userId === id) {
    nameInp = (
      <td id={nameId}>
        {" "}
        <Input id={id} idValue={nameInpId} value={name} />
      </td>
    );
    emailInp = (
      <td id={emailId}>
        <Input id={id} idValue={emailInpId} value={email} />
      </td>
    );
    roleInp = (
      <td id={roleId}>
        <Input id={id} idValue={roleInpId} value={role} />
      </td>
    );
  } else {
    nameInp = <td id={nameId}> {name} </td>;
    emailInp = <td id={emailId}>{email}</td>;
    roleInp = <td id={roleId}>{role}</td>;
  }

  return (
    <tr>
      <td>
        <CheckBox id={`chckBox-${id}`} value={id} />
      </td>
      {nameInp}
      {emailInp}
      {roleInp}

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
