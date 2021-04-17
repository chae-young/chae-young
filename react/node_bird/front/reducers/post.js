import shortid from 'shortid';

export const initialState = {
    mainPosts:[{
        id:1,
        User:{
            id:1,
            nickname:'2chaeng',
        },
        content:'첫번째 #감성 #맞팔 #좋아요',
        Images:[ 
            {id:shortid.generate(),src:'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg'},
            {id:shortid.generate(),src:'https://t1.daumcdn.net/cfile/tistory/994BEF355CD0313D05'},
        ],
        Comments:[
            {
                id:shortid.generate(),
                User:{id:shortid.generate(),nickname:'cy'},
                content:'우와..'
            }
        ],
    }],
    imagePaths:[],
    addPostLoading:false,    
    addPostDone:false,    
    addPostError:null,    
    removePostLoading:false,    
    removePostDone:false,    
    removePostError:null, 
    addCommentLoading:false,    
    addCommentDone:false,    
    addCommentError:null,      
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAIL = 'ADD_POST_FAIL';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAIL = 'REMOVE_POST_FAIL';

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

const dummyPost = (data)=> ({
    id:data.id,
    User:{
        id:1,
        nickname:'제로초',
    },
    content:data.content,
    Images:[],
    Comments:[],
})
const dummyComment = (data)=> ({
    id:shortid.generate(),
    User:{
        id:1,
        nickname:'제로초',
    },
    content:data,
})

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
                mainPosts:[dummyPost(action.data),...state.mainPosts],//앞에추가해야 게시글위에올라감
                addPostLoading:false,    
                addPostDone:true,  
            }
        case ADD_POST_FAIL:
            return{
                ...state,
                addPostLoading:false,
                addPostError:action.error
            }
        case REMOVE_POST_REQUEST:
            return{
                ...state,
                removePostLoading:true,    
                removePostDone:false,    
                removePostError:null,
            }             
        case REMOVE_POST_SUCCESS:
            return{
                ...state,
                mainPosts:state.mainPosts.filter(v=>v.id!==action.data),
                removePostLoading:false,    
                removePostDone:true,  
            }
        case REMOVE_POST_FAIL:
            return{
                ...state,
                removePostLoading:false,
                removePostError:action.error
            }            
        case ADD_COMMENT_REQUEST:
            return{
                ...state,
                addCommentLoading:true,    
                addCommentDone:false,    
                addCommentError:null,
            }             
        case ADD_COMMENT_SUCCESS:{
            //불변성은 바뀌는 것만바뀌고 안바뀌는 건 참조유지
            //action.data.content,action.data.postid,action.data.userid
            //해당게시글의 댓글에 접근하기위해 id를 찾는다
            const postIndex = state.mainPosts.findIndex(v=>v.id===action.data.postId);

            const post = {...state.mainPosts[postIndex]};
            post.Comments = [dummyComment(action.data.content),...post.Comments];

            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = post; 
            return{
                ...state,
                mainPosts,
                addCommentLoading:false,    
                addCommentDone:true,  
            }
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