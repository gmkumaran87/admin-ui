import React from "react";
import { useGlobalContext } from "../context/Context";

const CheckBox = (props) => {
  const { id, value } = props;
  const { pagination, currPage, loadSelectedUsers } = useGlobalContext();

  const handleChange = (e) => {
    console.log(e.currentTarget.id);

    if (e.currentTarget.id === "checkBox-all") {
      const checkAll = e.currentTarget.checked;
      for (let user of pagination[currPage]) {
        const checkBox = document.getElementById(`chckBox-${user.id}`);
        if (checkAll) {
          checkBox.checked = true;
          loadSelectedUsers(checkBox.value, checkBox.checked);
        } else {
          checkBox.checked = false;
          loadSelectedUsers(checkBox.value, checkBox.checked);
        }
      }
    } else {
      loadSelectedUsers(e.currentTarget.value, e.currentTarget.checked);
    }
  };

  return (
    <input type="checkbox" id={id} value={value} onChange={handleChange} />
  );
};

export default CheckBox;
