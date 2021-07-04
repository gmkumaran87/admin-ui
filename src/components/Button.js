import React, { useState } from "react";
import "./Button.css";

import { useGlobalContext } from "../context/Context";

function Button(props) {
  const { handlePage, removeItem, removeSelected, editItem } =
    useGlobalContext();
  const { id, children, text } = props;

  const classes = `btn ${props.className}`;

  const handleClick = (e) => {
    const currEl = e.currentTarget.dataset.text;
    const currId = e.currentTarget.id;
    //console.log(`currEl`, currEl, currId);
    handlePage(currEl);

    if (["edit", "delete"].includes(currEl)) {
      // If Edit button is clicked open the Form Modal
      if (currEl === "edit") {
        console.log(`currEl`, currEl, currId);
        const modal = document.querySelector(".modal-outer");
        modal.classList.add("open");

        editItem(currId);
      } else if (currEl === "delete") {
        removeItem(currId);
      }
    }
    if (currEl === "delete-selected") {
      console.log(`clicking Delete`);
      removeSelected();
    }
  };
  return (
    <button
      type="button"
      className={classes}
      id={id}
      data-text={text}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
