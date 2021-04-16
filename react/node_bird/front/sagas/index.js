import {all,call,fork,take,put,takeLatest, delay} from 'redux-saga/effects';
import userSaga from './user';
import postSaga from './post';

/*
all : 배열을 받고 그 안에들어있는 것들을 한번에 실행 
fork : 함수를 실행 (비동기)
call : '' (동기)
take : action이 실행될때까지 기다림 (단 한번만실행하고 사라져버림)
tekeEvery:take 대신
tekeLatest:마지막실행만 받는다
put : dispatch역할
*/



export default function* rootSaga(){
    yield all([
        fork(userSaga),
        fork(postSaga),   
    ])
}