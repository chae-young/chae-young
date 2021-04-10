export const initialState = {
    isLoggedin:false,
    user:null,
    signUpData:{},
    loginData:{},
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case 'LOG_IN':
            return{
                ...state,
                isLoggedin:true,
                user:action.data,
            }
        case 'LOG_OUT':
            return{
                ...state,
                isLoggedin:false,
                user:null,
            }      
        default:
            return state
    }
}
export const loginAction = (data) =>{
    return {
        type:'LOG_IN',
        data,
    }
}

export const logoutAction = (data) =>{
    return {
        type:'LOG_OUT',
    }
}
export default reducer;