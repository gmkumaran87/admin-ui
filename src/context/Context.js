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
  isError: false,
  errorMsg: "",
  editUser: {},
};

const URL =
  " https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

function Context({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = async () => {
    try {
      const res = await fetch(URL);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await res.json();

      dispatch({ type: "LOAD_USERS", payload: data });
      dispatch({ type: "LOADING" });
      return data;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
      console.log(`error`, error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    dispatch({ type: "LOAD_USERS", payload: state.userList });
  }, [state.userList]);

  const filterUsers = (data) => {
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
    const curentPage = state.currPage;

    dispatch({ type: "REMOVE_SELECTED", payload: curentPage });
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

  const editItem = (userObj) => {
    console.log(`id`, userObj);
    dispatch({ type: "UPDATE_USER", payload: userObj });
  };
  const setInputValue = (value) => {
    dispatch({ type: "SHOW_INPUT", payload: value });
  };

  /*const userEdit = (user) => {
    console.log(`user`, user);
    dispatch({ type: "UPDATE_USER", payload: user });
  };*/
  return (
    <AppContext.Provider
      value={{
        ...state,
        handlePage,
        removeItem,
        editItem,
        removeSelected,
        loadSelectedUsers,
        selectAllUsersPage,
        filterUsers,
        setInputValue,
      }}
    >
      {" "}
      {children}{" "}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { Context, AppContext };
