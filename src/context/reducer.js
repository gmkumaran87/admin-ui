const NUM_PER_PAGE = 10;

const reducer = (state, action) => {
    const paginate = (data) => {
        const dataLength = data.length;
        const usersPerPage = Math.ceil(dataLength / NUM_PER_PAGE);
        const pages = {};

        for (let i = 0, cnt = 0; cnt < usersPerPage; cnt++) {
            pages[cnt + 1] = data.slice(i, i + NUM_PER_PAGE);
            i = i + NUM_PER_PAGE;
        }

        return pages;
    };

    switch (action.type) {
        case "LOADING":
            return {...state, isLoading: true };
        case "ERROR":
            return {
                ...state,
                isError: true,
                isLoading: false,
                errorMsg: action.payload,
            };
        case "SHOW_INPUT":
            return {...state, inputValue: action.payload };
        case "LOAD_USERS":
            const pages = paginate(action.payload);
            return {
                ...state,
                userList: action.payload,
                pagination: pages,
            };
        case "FILTER_USERS":
            const filteredPages = paginate(action.payload);
            console.log(`filteredPages`, filteredPages);
            return {
                ...state,
                filteredList: action.payload,
                pagination: filteredPages,
                currPage: 1,
            };

        case "SET_PAGE":
            return {...state, currPage: action.payload };
        case "REMOVE_ITEM":
            const newItem = state.userList.filter((list) => {
                return list.id !== action.payload;
            });
            return {...state, userList: newItem };

        case "EDIT_ITEM":
            const editItem = state.userList.filter(
                (list) => list.id === action.payload
            )[0];

            return {...state, editUser: editItem };
        case "UPDATE_USER":
            const { id, name, email, role } = action.payload;

            const updatedUsers = state.userList.map((item) => {
                if (item.id === id) {
                    return { id, name, email, role };
                } else {
                    return item;
                }
            });

            return {...state, userList: updatedUsers, editUser: {} };
        case "LOAD_SELECTED":
            const newSelected = [...state.selectedUser, action.payload];

            return {...state, selectedUser: newSelected };

        case "UNLOAD_SELECTED":
            const unSelect = state.selectedUser.filter(
                (user) => user !== action.payload
            );

            return {
                ...state,
                selectedUser: unSelect,
            };

        case "REMOVE_SELECTED":
            const lastPage = Object.keys(state.pagination).length;
            //Setting the current page initially
            let currentPage = action.payload;
            // If the current page is the last page then after deleting the page
            // currentPage set to previous page.
            if (lastPage === action.payload) currentPage = lastPage - 1;

            const removeSelected = state.userList.filter(
                (el) => !state.selectedUser.includes(el.id)
            );

            return {
                ...state,
                userList: removeSelected,
                selectedUser: [],
                inputValue: "",
                currPage: currentPage,
            };
        default:
            throw new Error("no matching action type");
    }
};

export default reducer;