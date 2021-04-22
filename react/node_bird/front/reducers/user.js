import produce from 'immer';

export const initialState = {
    followLoading:false,//팔로우 시도중
    followDone:false,
    followError:null,
    unfollowLoading:false,//언팔로우 시도중
    unfollowDone:false,
    unfollowError:null,        
    loginLoading:false,//로그인 시도중
    loginDone:false,
    loginError:null,
    logOutLoading:false,//로그아웃 시도중
    logOutDone:false,
    logOutError:null,
    signUpLoading:false,//회원가입 시도중
    signUpDone:false,
    signUpError:null,  
    changeNicknameLoading:false,//닉네임변경 시도중
    changeNicknameDone:false,
    changeNicknameError:null,      
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

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAIL = 'CHANGE_NICKNAME_FAIL';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAIL = 'FOLLOW_FAIL';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAIL = 'UNFOLLOW_FAIL';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

const dummyUser = (data) =>({
    ...data,
    nickname:'cy',
    id:1,
    Posts:[{id:1}],
    Followings:[{nickname:'mark',nickname:'jenny'}],
    Followers:[{nickname:'mark',nickname:'jenny'}],
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
    return produce(state,(draft)=>{
        switch(action.type){
            case FOLLOW_REQUEST:
                draft.followLoading=true;
                draft.followDone=false;
                draft.followError=null;
                break;
            case FOLLOW_SUCCESS:
                draft.followLoading=false;
                draft.isLoggedin=true;
                draft.followDone=true;
                draft.me.Followings.push({id:action.data});
                break;
            case FOLLOW_FAIL:
                draft.followLoading=false;
                draft.followError=action.error
                break;   
            case UNFOLLOW_REQUEST:
                draft.unfollowLoading=true;
                draft.unfollowDone=false;
                draft.unfollowError=null;
                break;
            case UNFOLLOW_SUCCESS:
                draft.unfollowLoading=false;
                draft.isLoggedin=true;
                draft.unfollowDone=true;
                draft.me.Followings = draft.me.Followings.filter(v=>v.id!==action.data)
                break;
            case UNFOLLOW_FAIL:
                draft.unfollowLoading=false;
                draft.unfollowError=action.error
                break;                               
            case LOG_IN_REQUEST:
                draft.loginLoading=true;
                draft.loginDone=false;
                draft.loginError=null;
                break;
            case LOG_IN_SUCCESS:
                draft.loginLoading=false;
                draft.isLoggedin=true;
                draft.loginDone=true;
                draft.me=dummyUser(action.data);
                break;
            case LOG_IN_FAIL:
                draft.loginLoading=false;
                draft.loginError=action.error
                break;                                      
            case LOG_OUT_REQUEST:
                draft.logOutLoading=true;//로그아웃 시도중
                draft.logOutDone=false;
                draft.logOutError=null;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutLoading=false;//로그아웃 시도중
                draft.logOutDone=true;
                draft.me=null;
                break;
            case LOG_OUT_FAIL:
                draft.logOutLoading=false;
                draft.logOutError=action.error;
                break; 
            case SIGN_UP_REQUEST:
                draft.signUpLoading=true;//로그아웃 시도중
                draft.signUpDone=false;
                draft.signUpError=null;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading=false;//로그아웃 시도중
                draft.signUpDone=true;
                break;
            case SIGN_UP_FAIL:
                draft.signUpLoading=false;
                draft.signUpError=action.error;
                break;
            case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameLoading=true;//로그아웃 시도중
                draft.changeNicknameDone=false;
                draft.changeNicknameError=null;
                break;
            case CHANGE_NICKNAME_SUCCESS:
                draft.changeNicknameLoading=false;
                draft.changeNicknameDone=true;
                break;
            case CHANGE_NICKNAME_FAIL:
                draft.changeNicknameLoading=false;
                draft.changeNicknameError=action.error;
                break;
            case ADD_POST_TO_ME:
                draft.me.Posts.unshift({id:action.data})     
                break;
            case REMOVE_POST_OF_ME:
                draft.me.Posts=draft.me.Posts.filter(v=>v.id !== action.date);
                break;                                                             
            default:
                break;
        }
    })    
    /*
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
        case CHANGE_NICKNAME_REQUEST:
            return{
                ...state,
                changeNicknameLoading:true,//로그아웃 시도중
                changeNicknameDone:false,
                changeNicknameError:null,
            }  
        case CHANGE_NICKNAME_SUCCESS:
            return{
                ...state,
                changeNicknameLoading:false,//로그아웃 시도중
                changeNicknameDone:true,
            }    
        case CHANGE_NICKNAME_FAIL:
            return{
                ...state,
                changeNicknameLoading:false,
                changeNicknameError:action.error,
            }
        case ADD_POST_TO_ME:
            return{
                ...state,
                me:{
                    ...state.me,
                    Posts:[{id:action.data},...state.me.Posts]
                }
            }           
        case REMOVE_POST_OF_ME:
            return{
                ...state,
                me:{
                    ...state.me,
                    Posts:state.me.Posts.filter(v=>v.id !== action.date),
                }
            }                                                                 
        default:
            return state
    }*/
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