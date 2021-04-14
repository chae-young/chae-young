import {createWrapper} from 'next-redux-wrapper';
import {createStore,compose,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers'
import rootSaga from '../sagas';

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    
    return next(action);
};

//store=> state,reducer 포함된것
const  configureStore = () =>{
    const sagaMiddleware = createSagaMiddleware;
    const middelewears = [sagaMiddleware,loggerMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middelewears))//배포용일때 연결안하고
    : composeWithDevTools(applyMiddleware(...middelewears))//개발용일때 연결
    const store = createStore(reducer,enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga)
    return store
};

const wrapper = createWrapper(configureStore,{//옵션객체 : 개발모드 true
    debug:process.env.NODE_ENV === 'development', 
});

export default wrapper;