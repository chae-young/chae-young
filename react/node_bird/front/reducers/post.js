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
    addPostLoading:false,    
    addPostDone:false,    
    addPostError:null,    
    addCommentLoading:false,    
    addCommentDone:false,    
    addCommentError:null,      
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAIL = 'ADD_POST_FAIL';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAIL = 'ADD_COMMENT_FAIL';

export const addPost = (data)=>({
    type:ADD_POST_REQUEST,
    data,
});
export const addComment = (data)=>({
    type:ADD_COMMENT_REQUEST,
    data,
});

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
        case ADD_POST_REQUEST:
            return{
                ...state,
                addPostLoading:true,    
                addPostDone:false,    
                addPostError:null,
            }             
        case ADD_POST_SUCCESS:
            return{
                ...state,
                mainPosts:[dummyPost,...state.mainPosts],//앞에추가해야 게시글위에올라감
                addPostLoading:false,    
                addPostDone:true,  
            }
        case ADD_POST_FAIL:
            return{
                ...state,
                addPostLoading:false,
                addPostError:action.error
            }
        case ADD_COMMENT_REQUEST:
            return{
                ...state,
                addCommentLoading:true,    
                addCommentDone:false,    
                addCommentError:null,
            }             
        case ADD_COMMENT_SUCCESS:
            return{
                ...state,
                addCommentLoading:false,    
                addCommentDone:true,  
            }
        case ADD_COMMENT_FAIL:
            return{
                ...state,
                addCommentLoading:false,
                addCommentError:action.error
            }            
        default:
            return state
    }
}

export default reducer;