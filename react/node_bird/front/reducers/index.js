import {HYDRATE} from 'next-redux-wrapper';
//reducer 합쳐주는것
import {combineReducers} from 'redux';
import user from './user';
import post from './post';

//현재 state(중앙저장소)




//이전상태와 액션을 통해 다음상태를 만들어냄
const rootReducer = combineReducers({
    //서버사이드렌더링을 위해 index
    index: (state = {},action)=>{
        switch(action.type){
            case HYDRATE:
                console.log(HYDRATE,action)
                return {...state,...action.payload}
            default:
                return state           
        }
    },
    user,
    post,

});

export default rootReducer