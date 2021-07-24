import React, { useState, useRef } from "react";
import "./Button.css";
import editUser from "./EditUser";

import { useGlobalContext } from "../context/Context";

function Button(props) {
  const { handlePage, removeItem, removeSelected, editItem } =
    useGlobalContext();

  const { id, children, text } = props;

  const classes = `btn ${props.className}`;

  const handleClick = (e) => {
    const currEl = e.currentTarget.dataset.text;
    const currId = e.currentTarget.id;

    /*For Displaying the current page when User clicks the Number/Prev/Next button
     in the Pagination.*/
    handlePage(currEl);

    //Handling EDIT/DELTE button in the table row
    if (["edit", "delete"].includes(currEl)) {
      // If Edit button is clicked Update the row
      if (currEl === "edit") {
        const newUser = editUser(currId);
        console.log(newUser);
        // Once the User PRESS ENTER save the input values to Arrays
        editItem(newUser);
      } else if (currEl === "delete") {
        // Remove the corresponding row from the List
        removeItem(currId);
      }
    }
    if (currEl === "delete-selected") {
      // If DELETE SELECTED is clicked, remove the selected rows
      removeSelected();
    }
  };
  return (
    <>
      <button
        type="button"
        className={classes}
        id={id}
        data-text={text}
        onClick={handleClick}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
