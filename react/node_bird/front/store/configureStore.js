import {createWrapper} from 'next-redux-wrapper'

const  configureStore = () =>{

};

const wrapper = createWrapper(configureStore,{//옵션객체
    debug:process.env.NODE_ENV === 'development',
});

export default wrapper;