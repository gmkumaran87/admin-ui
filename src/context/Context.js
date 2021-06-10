import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

const initialState = {
  isLoading: false,
  userList: [],
  filteredList: [],
  selectedUser: [],
  pagination: {},
  currPage: 1,
  checkAll: false,
  inputValue: "",
};

const URL =
  " https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

function Context({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = async () => {
    const res = await fetch(URL);
    const data = await res.json();

    dispatch({ type: "LOAD_USERS", payload: data });
    dispatch({ type: "LOADING" });
    return data;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    dispatch({ type: "LOAD_USERS", payload: state.userList });
  }, [state.userList]);

  const filterUsers = (data) => {
    // console.log(`data`, data);
    dispatch({ type: "FILTER_USERS", payload: data });
  };
  const selectAllUsersPage = (page) => {};

  const loadSelectedUsers = (id, checked) => {
    if (checked) {
      dispatch({ type: "LOAD_SELECTED", payload: id });
    } else {
      dispatch({ type: "UNLOAD_SELECTED", payload: id });
    }
  };
  const removeSelected = () => {
    dispatch({ type: "REMOVE_SELECTED" });
    const checkBoxAll = document.getElementById("checkBox-all");
    if (checkBoxAll.checked) checkBoxAll.checked = false;
  };

  const handlePage = (item) => {
    let pageNumber = "";
    const pages = Object.keys(state.pagination);

    if (pages.includes(item)) pageNumber = item;

    switch (item) {
      case "next":
        let nextPage = 0;
        console.log(`state.currPage`, pages.length, state.currPage);
        if (state.currPage === pages.length) {
          nextPage = 1;
        } else {
          nextPage = state.currPage + 1;
        }
        dispatch({ type: "SET_PAGE", payload: nextPage });
        return;
      case "prev":
        let prevPage = 0;
        if (state.currPage === 1) {
          prevPage = pages.length;
        } else {
          prevPage = state.currPage - 1;
        }
        dispatch({ type: "SET_PAGE", payload: prevPage });
        return;
      case "first":
        console.log(`first`, item);
        dispatch({ type: "SET_PAGE", payload: 1 });
        return;

      case "last":
        dispatch({ type: "SET_PAGE", payload: pages.length });
        return;
      case pageNumber:
        dispatch({ type: "SET_PAGE", payload: Number(item) });
        return;
      default:
        return;
    }
  };

  const removeItem = (id) => {
    console.log(`id`, id);
    dispatch({ type: "REMOVE_ITEM", payload: String(id) });
  };

  const setInputValue = (value) => {
    dispatch({ type: "SHOW_INPUT", payload: value });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handlePage,
        removeItem,
        removeSelected,
        loadSelectedUsers,
        selectAllUsersPage,
        filterUsers,
        setInputValue,
      }}
    >
      {children}{" "}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { Context, AppContext };
