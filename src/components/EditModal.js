import React, { useState, useEffect } from "react";
import "./EditModal.css";
import { useGlobalContext } from "../context/Context";

const EditModal = (props) => {
  const { userEdit } = useGlobalContext();
  const { id, name, email, role } = props.item;

  const [inputNameState, setName] = useState("");
  const [inputEmailState, setEmail] = useState("");
  const [inputRoleState, setRole] = useState("");

  const handleSubmit = (e) => {
    let userObj = { id: id, name: "", email: "", role: "" };
    e.preventDefault();
    console.log(`e.target`, e.target);

    const formElements = document.querySelector(".edit-form").elements;

    for (let el of formElements) {
      if (el.name === "inpName") userObj["name"] = el.value;
      if (el.name === "inpEmail") userObj["email"] = el.value;
      if (el.name === "inpRole") userObj["role"] = el.value;
    }

    // Sending the edited object to store in the main Array
    userEdit(userObj);

    // Once the Submit button clicks store the value and close the Modal
    closeModal();
  };
  const handleOnchange = (e) => {
    console.log(`e`, e.target.name);
    const input = e.target.value;

    if (e.target.name === "inpName") setName(input);
    if (e.target.name === "inpEmail") setEmail(input);
    if (e.target.name === "inpRole") setRole(input);
  };

  const clickOutside = (e) => {
    const outside = !e.target.closest(".modal-inner");
    if (outside) closeModal();
  };

  const closeModal = () => {
    const modal = document.querySelector(".modal-outer");
    modal.classList.remove("open");
  };

  useEffect(() => {
    setEmail(email);
    setName(name);
    setRole(role);
  }, [email, name, role]);
  return (
    <div className="modal-outer" onClick={clickOutside}>
      <div className="modal-inner">
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-control edit-control">
            <label htmlFor="inpName">Name </label>
            <input
              type="text"
              className="admin-input"
              value={inputNameState}
              name="inpName"
              onChange={handleOnchange}
            />

            <label htmlFor="inpEmail">Email </label>
            <input
              type="text"
              className="admin-input"
              value={inputEmailState}
              name="inpEmail"
              onChange={handleOnchange}
            />

            <label htmlFor="inpRole">Role </label>
            <input
              type="text"
              className="admin-input"
              value={inputRoleState}
              name="inpRole"
              onChange={handleOnchange}
            />

            <button className="btn edit-form-btn submit-btn"> Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
