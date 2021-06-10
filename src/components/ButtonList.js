import React from "react";
import Button from "./Button";
import { useGlobalContext } from "../context/Context";

import { ImFirst, ImLast, ImNext2, ImPrevious2 } from "react-icons/im";

function ButtonList() {
  const { pagination } = useGlobalContext();
  const btns = Object.keys(pagination);

  const buttons = btns.map((btn) => {
    return (
      <Button className="page-btn" key={btn} text={btn}>
        {btn}
      </Button>
    );
  });

  return (
    <div className="btn-container">
      <Button className="delete-btn" text="delete-selected" id={"deleteId"}>
        Delete Selectedtext
      </Button>
      <div className="page-container">
        <Button className="first-btn" text="first">
          <ImFirst />
        </Button>
        <Button className="prev-btn" text="prev">
          <ImPrevious2 />
        </Button>
        {buttons}
        <Button className="next-btn" text="next">
          <ImNext2 />
        </Button>
        <Button className="last-btn" text="last">
          <ImLast />
        </Button>
      </div>
    </div>
  );
}

export default ButtonList;
