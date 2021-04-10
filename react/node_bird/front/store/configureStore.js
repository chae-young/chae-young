import {createWrapper} from 'next-redux-wrapper';
import {createStore,compose,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducer from '../reducers'

//store=> state,reducer 포함된것
const  configureStore = () =>{
    const middelewears = [];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middelewears))//배포용일때 연결안하고
    : composeWithDevTools(applyMiddleware(...middelewears))//개발용일때 연결
    const store = createStore(reducer,enhancer);
    return store
};

const wrapper = createWrapper(configureStore,{//옵션객체 : 개발모드 true
    debug:process.env.NODE_ENV === 'development', 
});

export default wrapper;