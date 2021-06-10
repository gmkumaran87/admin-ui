import React from "react";
import "./Button.css";
import { useGlobalContext } from "../context/Context";

function Button(props) {
  const { handlePage, removeItem, removeSelected } = useGlobalContext();
  const { id, children, text } = props;

  const classes = `btn ${props.className}`;

  const handleClick = (e) => {
    const currEl = e.currentTarget.dataset.text;
    const currId = e.currentTarget.id;
    //console.log(`currEl`, currEl, currId);
    handlePage(currEl);

    if (["edit", "delete"].includes(currEl)) {
      removeItem(currId);
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
