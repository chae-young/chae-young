import {all,call,fork,take,put,takeLatest, delay} from 'redux-saga/effects';
import {
    ADD_POST_REQUEST,ADD_POST_SUCCESS,ADD_POST_FAIL,
    ADD_COMMENT_FAIL,ADD_COMMENT_REQUEST,ADD_COMMENT_SUCCESS
} from '../reducers/post'
import axios from 'axios';

function addPostAPI(data){
    //데이터받아와서
    return axios.post('/api/post',data)
}
function* addPost(){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        //const result = yield call(addPostAPI,action.data);
        yield delay(1000);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:ADD_POST_SUCCESS,
            //data:result.data,
        })
    }catch(err){
        yield put({
            type:ADD_POST_FAIL,
            error:err.response.data,
        })
    }
}
function addCommentAPI(data){
    //데이터받아와서
    return axios.post('/api/post',data)
}
function* addComment(){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        //const result = yield call(addPostAPI,action.data);
        yield delay(1000);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:ADD_COMMENT_SUCCESS,
            //data:result.data,
        })
    }catch(err){
        yield put({
            type:ADD_COMMENT_FAIL,
            data:err.response.data,
        })
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST,addPost);
}
function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST,addComment);
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),   
        fork(watchAddComment),   
    ])
}