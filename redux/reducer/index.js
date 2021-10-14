import { combineReducers } from "redux";

const initState = {
    // state의 초기값
    title: "",
    content: "",
};

//액션
const ADD_POST = "ADD_POST";

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                title: action.data.title,
            };
        //기본값
        default:
            return state;
    }
};

export default reducer;
