import {all,call,fork,take,put,takeLatest, delay, actionChannel} from 'redux-saga/effects';
import {
    ADD_POST_REQUEST,ADD_POST_SUCCESS,ADD_POST_FAIL,
    REMOVE_POST_REQUEST,REMOVE_POST_SUCCESS,REMOVE_POST_FAIL,
    ADD_COMMENT_FAIL,ADD_COMMENT_REQUEST,ADD_COMMENT_SUCCESS
} from '../reducers/post'
import axios from 'axios';
import { ADD_POST_TO_ME ,REMOVE_POST_OF_ME} from '../reducers/user';
import shortId from 'shortid';

function addPostAPI(data){
    //데이터받아와서
    return axios.post('/api/post',data)
}
function* addPost(action){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        //const result = yield call(addPostAPI,action.data);
        yield delay(1000);
        const id = shortId.generate();
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:ADD_POST_SUCCESS,
            data:{id,content:action.data}
            //data:result.data,
        })
        yield put({
            type:ADD_POST_TO_ME,
            data:id
        })
    }catch(err){
        yield put({
            type:ADD_POST_FAIL,
            error:err.response.data,
        })
    }
}
function removePostAPI(data){
    //데이터받아와서
    return axios.delete('/api/post',data)
}
function* removePost(action){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        //const result = yield call(addPostAPI,action.data);
        yield delay(1000);

        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:REMOVE_POST_SUCCESS,
            data:action.data
            //data:result.data,
        })
        yield put({
            type:REMOVE_POST_OF_ME,
            data:action.data,
        })
    }catch(err){
        yield put({
            type:REMOVE_POST_FAIL,
            error:err.response.data,
        })
    }
}
function addCommentAPI(data){
    //데이터받아와서
    return axios.post('/api/post',data)
}
function* addComment(action){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        //const result = yield call(addPostAPI,action.data);
        yield delay(1000);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:ADD_COMMENT_SUCCESS,
            data:action.data,
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
function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST,removePost);
}
function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST,addComment);
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),   
        fork(watchRemovePost),   
        fork(watchAddComment),   
    ])
}