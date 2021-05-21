import {all,call,fork,take,put,takeLatest, delay} from 'redux-saga/effects';
import {
    LOG_IN_FAIL,LOG_IN_REQUEST,LOG_IN_SUCCESS,
    FOLLOW_REQUEST,FOLLOW_SUCCESS,FOLLOW_FAIL,
    UNFOLLOW_REQUEST,UNFOLLOW_SUCCESS,UNFOLLOW_FAIL,
    LOG_OUT_FAIL,LOG_OUT_SUCCESS,LOG_OUT_REQUEST,
    SIGN_UP_FAIL,SIGN_UP_SUCCESS,SIGN_UP_REQUEST,
    LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL,
    CHANGE_NICKNAME_REQUEST,CHANGE_NICKNAME_SUCCESS,CHANGE_NICKNAME_FAIL,
    LOAD_FOLLOWERS_REQUEST,LOAD_FOLLOWERS_SUCCESS,LOAD_FOLLOWERS_FAIL,
    LOAD_FOLLOWINGS_REQUEST,LOAD_FOLLOWINGS_SUCCESS,LOAD_FOLLOWINGS_FAIL,
    REMOVE_FOLLOWER_REQUEST,REMOVE_FOLLOWER_SUCCESS,REMOVE_FOLLOWER_FAIL
} from '../reducers/user';
import axios from 'axios';

function removeFollowerAPI(data){
    //데이터받아와서
    return axios.delete(`/user/follower/${data}`)
}
function* removeFollower(action){
    try{
        const result = yield call(removeFollowerAPI,action.data);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:REMOVE_FOLLOWER_SUCCESS,
            data:result.data,
        })
    }catch(err){
        yield put({
            type:REMOVE_FOLLOWER_FAIL,
            error:err.response.data,
        })
    }
}
function loadFollowersAPI(data){
    //데이터받아와서
    return axios.get('/user/followers',data)
}
function* loadFollowers(action){
    try{
        const result = yield call(loadFollowersAPI,action.data);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:LOAD_FOLLOWERS_SUCCESS,
            data:result.data,
        })
    }catch(err){
        yield put({
            type:LOAD_FOLLOWERS_FAIL,
            error:err.response.data,
        })
    }
}
function loadFollowingsAPI(data){
    //데이터받아와서
    return axios.get('/user/followings',data)
}
function* loadFollowings(action){
    try{
        const result = yield call(loadFollowingsAPI,action.data);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:LOAD_FOLLOWINGS_SUCCESS,
            data:result.data,
        })
    }catch(err){
        yield put({
            type:LOAD_FOLLOWINGS_FAIL,
            error:err.response.data,
        })
    }
}
function loadUserAPI(){
    //데이터받아와서
    return axios.get('/user')
}
function* loadUser(action){
    try{
        const result = yield call(loadUserAPI,action.data);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:LOAD_USER_SUCCESS,
            data:result.data,
        })
    }catch(err){
        yield put({
            type:LOAD_USER_FAIL,
            error:err.response.data,
        })
    }
}
function followAPI(data){
    //데이터받아와서
    return axios.patch(`/user/${data}/follow`)
}
function* follow(action){
    try{
        const result = yield call(followAPI,action.data)
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:FOLLOW_SUCCESS,
            //data:result.data,
            data:result.data,
        })
    }catch(err){
        yield put({
            type:FOLLOW_FAIL,
            error:err.response.data,
        })
    }
}
function unfollowAPI(data){
    //데이터받아와서
    return axios.delete(`/user/${data}/follow`)
}
function* unfollow(action){
    try{
        const result = yield call(unfollowAPI,action.data)
        yield put({//액션을 디스패치한다
            type:UNFOLLOW_SUCCESS,
            //data:result.data,
            data:result.data,
        })
    }catch(err){
        yield put({
            type:UNFOLLOW_FAIL,
            error:err.response.data,
        })
    }
}
function logInAPI(data){
    //데이터받아와서
    return axios.post('/user/login',data)
}
function* logIn(action){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        //logInAPT를 호출하여 action.data 값 보내기
        const result = yield call(logInAPI,action.data);
        //yield delay(1000);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:LOG_IN_SUCCESS,
            //data:result.data,
            data:result.data,
        })
    }catch(err){
        yield put({
            type:LOG_IN_FAIL,
            error:err.response.data,
        })
    }
}
function logOutAPI(){
    //데이터받아와서
    return axios.post('/user/logout')
}
function* logOut(){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        yield call(logOutAPI);
        //yield delay(1000);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:LOG_OUT_SUCCESS,
            //data:result.data,
        })
    }catch(err){
        yield put({
            type:LOG_OUT_FAIL,
            error:err.response.data,
        })
    }
}
function signUpAPI(data){
    //데이터받아와서
    return axios.post('/user',data)//{email,password,nick}
}
function* signUp(action){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        //logInAPT를 호출하여 action.data 값 보내기
        const result = yield call(signUpAPI,action.data);
        console.log(result)
        //yield delay(1000);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:SIGN_UP_SUCCESS,
            //data:result.data,
            //data:action.data,
        })
    }catch(err){
        yield put({
            type:SIGN_UP_FAIL,
            error:err.response.data,
        })
    }
}
function changeNicknameAPI(data){
    //데이터받아와서
    return axios.patch('/user/nickname',{nickname:data})//{email,password,nick}
}
function* changeNickname(action){
    try{
        const result = yield call(changeNicknameAPI,action.data);
        yield put({//액션을 디스패치한다
            type:CHANGE_NICKNAME_SUCCESS,
            data:result.data,
        })
    }catch(err){
        yield put({
            type:CHANGE_NICKNAME_FAIL,
            error:err.response.data,
        })
    }
}
function* watchRemoveFollower(){
    yield takeLatest(REMOVE_FOLLOWER_REQUEST,removeFollower);
}
function* watchLoadFollowers(){
    yield takeLatest(LOAD_FOLLOWERS_REQUEST,loadFollowers);
}
function* watchLoadFollowings(){
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST,loadFollowings);
}
function* watchLoadUser(){
    yield takeLatest(LOAD_USER_REQUEST,loadUser);
}
function* watchFollow(){
    yield takeLatest(FOLLOW_REQUEST,follow);
}
function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_REQUEST,unfollow);
}
function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST,logIn);//로그인 액션이 실행되면 logIn실행->이벤트리스터 역할
}
function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST,logOut);
}
function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST,signUp);
}
function* watchChangeNickname(){
    yield takeLatest(CHANGE_NICKNAME_REQUEST,changeNickname);
}

export default function* userSaga(){
    yield all([
        fork(watchRemoveFollower),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchChangeNickname),
        fork(watchLoadUser),
        fork(watchFollow),
        fork(watchUnfollow),        
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}