import React from "react";
import { useGlobalContext } from "../context/Context";
import TableList from "./TableList";
import "./Table.css";

function Tables() {
  const { pagination, currPage } = useGlobalContext();

  const handleChange = (e) => {
    console.log(`object`, e.currentTarget);
  };

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" value="all" onChange={handleChange} />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pagination[currPage].map((list) => {
            return (
              <TableList
                key={list.id}
                id={list.id}
                name={list.name}
                email={list.email}
                role={list.role}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
