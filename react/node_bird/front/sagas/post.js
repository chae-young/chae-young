import {all,call,fork,take,put,takeLatest, delay, actionChannel,throttle} from 'redux-saga/effects';
import {
    ADD_POST_REQUEST,ADD_POST_SUCCESS,ADD_POST_FAIL,
    LOAD_POSTS_REQUEST,LOAD_POSTS_SUCCESS,LOAD_POSTS_FAIL,
    REMOVE_POST_REQUEST,REMOVE_POST_SUCCESS,REMOVE_POST_FAIL,
    LIKE_POST_REQUEST,LIKE_POST_SUCCESS,LIKE_POST_FAIL,
    UNLIKE_POST_REQUEST,UNLIKE_POST_SUCCESS,UNLIKE_POST_FAIL,
    ADD_COMMENT_FAIL,ADD_COMMENT_REQUEST,ADD_COMMENT_SUCCESS, generateDummyPost
} from '../reducers/post'
import axios from 'axios';
import { ADD_POST_TO_ME ,REMOVE_POST_OF_ME} from '../reducers/user';
import shortId from 'shortid';

function addPostAPI(data){
    //데이터받아와서
    return axios.post('/post',{content:data})//req.body 이름
}
function* addPost(action){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        const result = yield call(addPostAPI,action.data);
        //yield delay(1000);
        //const id = shortId.generate();
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:ADD_POST_SUCCESS,
            //data:{id,content:action.data}
            data:result.data,
        })
        yield put({
            type:ADD_POST_TO_ME,
            data:result.data.id
        })
    }catch(err){
        yield put({
            type:ADD_POST_FAIL,
            error:err.response.data,
        })
    }
}
function loadPostsAPI(data){
    //데이터받아와서
    return axios.get('/posts',data)
}
function* loadPosts(action){
    try{
        const result = yield call(loadPostsAPI,action.data);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:LOAD_POSTS_SUCCESS,
            data:result.data,
        })
    }catch(err){
        yield put({
            type:LOAD_POSTS_FAIL,
            error:err.response.data,
        })
    }
}
function removePostAPI(data){
    //데이터받아와서
    return axios.delete(`post/${data}`)
}
function* removePost(action){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        const result = yield call(removePostAPI,action.data);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:REMOVE_POST_SUCCESS,
            data:result.data
            //data:result.data,
        })
        yield put({
            type:REMOVE_POST_OF_ME,
            data:result.data,
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
    return axios.post(`/post/${data.postId}/comment`,data)
}
function* addComment(action){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        const result = yield call(addCommentAPI,action.data);
        console.log(result)
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:ADD_COMMENT_SUCCESS,
            data:result.data,
        })
    }catch(err){
        yield put({
            type:ADD_COMMENT_FAIL,
            data:err.response.data,
        })
    }
}
function likePostAPI(data){
    //데이터받아와서
    return axios.patch(`/post/${data}/like`)
}
function* likePost(action){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        const result = yield call(likePostAPI,action.data);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:LIKE_POST_SUCCESS,
            data:result.data,
        })
    }catch(err){
        yield put({
            type:LIKE_POST_FAIL,
            data:err.response.data,
        })
    }
}
function unlikePostAPI(data){
    //데이터받아와서
    return axios.delete(`/post/${data}/unlike`)
}
function* unlikePost(action){
    try{
        //결과값받기 (받을때까지 기다림 그래서 call 사용)
        const result = yield call(likePostAPI,action.data);
        //결과값 받으면..
        yield put({//액션을 디스패치한다
            type:UNLIKE_POST_SUCCESS,
            data:result.data,
        })
    }catch(err){
        yield put({
            type:UNLIKE_POST_FAIL,
            data:err.response.data,
        })
    }
}

function* watchLikePost(){
    yield takeLatest(LIKE_POST_REQUEST,likePost);
}
function* watchUnLikePost(){
    yield takeLatest(UNLIKE_POST_REQUEST,unlikePost);
}
function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST,addPost);
}
function* watchLoadPosts(){
    yield throttle(5000,LOAD_POSTS_REQUEST,loadPosts);
}
function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST,removePost);
}
function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST,addComment);
}

export default function* postSaga(){
    yield all([
        fork(watchLikePost),   
        fork(watchUnLikePost),   
        fork(watchAddPost),   
        fork(watchLoadPosts),   
        fork(watchRemovePost),   
        fork(watchAddComment),   
    ])
}