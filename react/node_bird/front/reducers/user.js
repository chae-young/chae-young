export const initialState = {
    isLoggedin:false,
    me:null,
    signUpData:{},
    loginData:{},
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case 'LOG_IN':
            return{
                ...state,
                isLoggedin:true,
                me:action.data,
            }
        case 'LOG_OUT':
            return{
                ...state,
                isLoggedin:false,
                me:null,
            }      
        default:
            return state
    }
}
//동적액션객체
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