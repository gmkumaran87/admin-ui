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
        case "LOAD_USERS":
            const pages = paginate(action.payload);
            return {...state, userList: action.payload, pagination: pages };
        case "SET_PAGE":
            return {...state, currPage: action.payload };
        case "REMOVE_ITEM":
            console.log(`action.payload`, typeof action.payload, state.userList);
            const newItem = state.userList.filter((list) => {
                return list.id !== action.payload;
            });
            return {...state, userList: newItem };
        case "LOAD_SELECTED":
            const newSelected = [...state.selectedUser, action.payload];
            console.log(`newSelected`, newSelected);
            return {...state, selectedUser: newSelected };

        case "UNLOAD_SELECTED":
            const unSelect = state.selectedUser.filter(
                (user) => user !== action.payload
            );
            console.log(`unSelect`, unSelect);
            return {...state, selectedUser: unSelect };

        case "REMOVE_SELECTED":
            console.log(`state.selectedUser`, state.selectedUser);
            const removeSelected = state.userList.filter(
                (el) => !state.selectedUser.includes(el.id)
            );
            console.log(`removeSelected`, removeSelected);
            return {...state, userList: removeSelected, selectedUser: [] };
        default:
            throw new Error("no matching action type");
    }
};

export default reducer;