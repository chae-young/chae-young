const initState = {
    // state의 초기값
    num: "",
    content: "",
};

//액션
export const ADD_NUM = "ADD_NUM";

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_NUM:
            return {
                ...state,
                num: action.data,
            };
        //기본값
        default:
            return state;
    }
};

export default reducer;
