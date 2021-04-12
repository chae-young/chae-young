export const initialState = {
    mainPosts:[{
        id:1,
        User:{
            id:1,
            nickname:'2chaeng',
        },
        content:'첫번째 #감성 #맞팔 #좋아요',
        Images:[
            {src:'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg'},
            {src:'https://t1.daumcdn.net/cfile/tistory/994BEF355CD0313D05'},
        ],
        Comments:[
            {
                User:{nickname:'cy'},
                content:'우와..'
            }
        ],
    }],
    imagePaths:[],
    postAdded:false    
}

const ADD_POST = 'ADD_POST';
export const addPost = {
    type:ADD_POST,
}

const dummyPost = {
    id:2,
    User:{
        id:2,
        nickname:'제로초',
    },
    content:'더미용',
    Images:[],
    Comments:[],
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case ADD_POST:
            return{
                ...state,
                mainPosts:[dummyPost,...state.mainPosts],//앞에추가해야 게시글위에올라감
                postAdded:true,
            }
        default:
            return state
    }
}

export default reducer;