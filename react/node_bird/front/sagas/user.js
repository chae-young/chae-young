import {all,call,fork,take,put,takeLatest, delay} from 'redux-saga/effects';
import {
    LOG_IN_FAIL,LOG_IN_REQUEST,LOG_IN_SUCCESS,
    LOG_OUT_FAIL,LOG_OUT_SUCCESS,LOG_OUT_REQUEST,
    SIGN_UP_FAIL,SIGN_UP_SUCCESS,SIGN_UP_REQUEST,
} from '../reducers/user';
import axios from 'axios';

function logInAPI(data){
    //데이터받아와서
    return axios.post('/api/login',data)
}
function* logIn(action){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        //logInAPT를 호출하여 action.data 값 보내기
        //const result = yield call(logInAPI,action.data);
        yield delay(1000);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:LOG_IN_SUCCESS,
            //data:result.data,
            data:action.data,
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
    return axios.post('/api/logout')
}
function* logOut(){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        //const result = yield call(logOutAPI);
        yield delay(1000);
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
    return axios.post('/api/login',data)
}
function* signUp(action){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        //logInAPT를 호출하여 action.data 값 보내기
        //const result = yield call(logInAPI,action.data);
        yield delay(1000);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:SIGN_UP_SUCCESS,
            //data:result.data,
            data:action.data,
        })
    }catch(err){
        yield put({
            type:SIGN_UP_FAIL,
            error:err.response.data,
        })
    }
}


function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST,logIn);//로그인 액션이 실행되면 logIn실행->이벤트리스터 역할
}
function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST,logOut);
}
function* watchSignUp(){
    yield takeLatest(SINGUP_REQUEST,signUp);
}


export default function* userSaga(){
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}