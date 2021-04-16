export const initialState = {
    loginLoading:false,//로그인 시도중
    loginDone:false,
    loginError:null,
    logOutLoading:false,//로그아웃 시도중
    logOutDone:false,
    logOutError:null,
    signUpLoading:false,//로그아웃 시도중
    signUpDone:false,
    signUpError:null,    
    me:null,
    signUpData:{},
    loginData:{},
}


export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAIL = 'LOG_OUT_FAIL';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAIL = 'FOLLOW_FAIL';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAIL = 'UNFOLLOW_FAIL';

const dummyUser = (data) =>({
    ...data,
    nickname:'cy',
    id:1,
    Posts:[],
    Followings:[],
    Followers:[],
})
//요청,성공,실패
export const loginRequestAction = (data) =>{
    return{
        type:'LOG_IN_REQUEST',
        data,
    }
}
// export const loginSuccessAction = (data) =>{
//     return{
//         type:'LOG_IN_SUCCESS',
//         data,
//     }
// }
// export const loginFailAction = (data) =>{
//     return{
//         type:'LOG_IN_FAIL',
//         data,
//     }
// }
export const logOutRequestAction = () =>{
    return{
        type:'LOG_OUT_REQUEST',
    }
}
// export const logOutSuccessAction = () =>{
//     return{
//         type:'LOG_OUT_SUCCESS',
//     }
// }
// export const logOutFailAction = () =>{
//     return{
//         type:'LOG_OUT_FAIL',
//     }
// }

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case LOG_IN_REQUEST:
            return{
                ...state,
                //초기화
                loginLoading:true,
                loginDone:false,
                loginError:null,
            }
        case LOG_IN_SUCCESS:
            return{
                ...state,
                loginLoading:false,//로그인 시도중
                isLoggedin:true,
                loginDone:true,
                me:dummyUser(action.data),
                // {
                //     ...action.data,
                //     nickname:'cy'
                // },
            }
        case LOG_IN_FAIL:
            return{
                ...state,
                loginLoading:false,//로그인 시도중
                loginError:action.error,
            }                                     
        case LOG_OUT_REQUEST:
            return{
                ...state,
                logOutLoading:true,//로그아웃 시도중
                logOutDone:false,
                logOutError:null,
            }  
        case LOG_OUT_SUCCESS:
            return{
                ...state,
                logOutLoading:false,//로그아웃 시도중
                logOutDone:true,
                me:null,
            }    
        case LOG_OUT_FAIL:
            return{
                ...state,
                logOutLoading:false,
                logOutError:action.error,
            }   
        case SIGN_UP_REQUEST:
            return{
                ...state,
                signUpLoading:true,//로그아웃 시도중
                signUpDone:false,
                signUpError:null,
            }  
        case SIGN_UP_SUCCESS:
            return{
                ...state,
                signUpLoading:false,//로그아웃 시도중
                signUpDone:true,
            }    
        case SIGN_UP_FAIL:
            return{
                ...state,
                signUpLoading:false,
                signUpError:action.error,
            }                                                      
        default:
            return state
    }
}
//동적액션객체
// export const loginAction = (data) =>{
//     return {
//         type:'LOG_IN',
//         data,
//     }
// }

// export const logoutAction = (data) =>{
//     return {
//         type:'LOG_OUT',
//     }
// }
export default reducer;