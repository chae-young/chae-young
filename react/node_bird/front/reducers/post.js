import shortid from 'shortid';
import produce from 'immer';
import faker from 'faker';

export const initialState = {
    mainPosts:[
        // {
        //     id:1,
        //     User:{
        //         id:1,
        //         nickname:'2chaeng',
        //     },
        //     content:'첫번째 #감성 #맞팔 #좋아요',
        //     Images:[ 
        //         {id:shortid.generate(),src:'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg'},
        //         {id:shortid.generate(),src:'https://t1.daumcdn.net/cfile/tistory/994BEF355CD0313D05'},
        //     ],
        //     Comments:[
        //         {
        //             id:shortid.generate(),
        //             User:{id:shortid.generate(),nickname:'cy'},
        //             content:'우와..'
        //         }
        //     ],
        // }
    ],
    imagePaths:[],
    hasMorePost:true,
    likePostLoading:false,    
    likePostDone:false,    
    likePostError:null,     
    unlikePostLoading:false,    
    unlikePostDone:false,    
    unlikePostError:null,       
    addPostLoading:false,    
    addPostDone:false,    
    addPostError:null,    
    removePostLoading:false,    
    removePostDone:false,    
    removePostError:null, 
    addCommentLoading:false,    
    addCommentDone:false,    
    addCommentError:null,    
    uploadImagesLoading:false,    
    uploadImagesDone:false,    
    uploadImagesError:null,          
}
export const generateDummyPost = (number) => Array(number).fill().map(()=>{
    return{
            id:shortid.generate(),
            User:{
                id:shortid.generate(),
                nickname:faker.name.findName(),
            },
            content:faker.lorem.paragraph(),
            Images:[{src:faker.image.image()}],
            Comments:[
                {
                    User:{
                        id:shortid.generate(),
                        nickname:faker.name.findName(),
                    },
                    content:faker.lorem.sentence(),                  
                }                
            ],     
    }
}) 

// initialState.mainPosts = initialState.mainPosts.concat(
//     generateDummyPost()
// );
export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAIL = 'UPLOAD_IMAGES_FAIL';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAIL = 'LIKE_POST_FAIL';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAIL = 'UNLIKE_POST_FAIL';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAIL = 'LOAD_POSTS_FAIL';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAIL = 'ADD_POST_FAIL';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAIL = 'REMOVE_POST_FAIL';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAIL = 'ADD_COMMENT_FAIL';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

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

//이전상태를 액션을통해 다음상태로 만들어내는 함수
const reducer = (state=initialState,action)=>{
    //state가 draft로 바뀜
    return produce(state,(draft)=>{
        switch(action.type){
            case REMOVE_IMAGE:
                draft.imagePaths = draft.imagePaths.filter((v,i)=>i!==action.data);
                break;
            case UPLOAD_IMAGES_REQUEST:
                draft.uploadImagesLoading=true;    
                draft.uploadImagesDone=false;    
                draft.uploadImagesError=null;
                break;
            case UPLOAD_IMAGES_SUCCESS:{
                draft.imagePaths = action.data;
                draft.uploadImagesLoading=false;   
                draft.uploadImagesDone=true;  
                break;
            }
            case UPLOAD_IMAGES_FAIL:
                draft.uploadImagesLoading=false;
                draft.uploadImagesError=action.error;
                break;             
            case LIKE_POST_REQUEST:
                draft.likePostLoading=true;    
                draft.likePostDone=false;    
                draft.likePostError=null;
                break;
            case LIKE_POST_SUCCESS:{
                const post = draft.mainPosts.find((v)=>v.id === action.data.PostId);
                post.Likers.push({id:action.data.UserId})
                draft.likePostLoading=false;   
                draft.likePostDone=true;  
                break;
            }
            case LIKE_POST_FAIL:
                draft.likePostLoading=false;
                draft.likePostError=action.error;
                break; 
            case UNLIKE_POST_REQUEST:
                draft.unlikePostLoading=true;    
                draft.unlikePostDone=false;    
                draft.unlikePostError=null;
                break;
            case UNLIKE_POST_SUCCESS:{
                const post = draft.mainPosts.find((v)=>v.id === action.data.PostId);
                post.Likers = post.Likers.filter((v)=> v.id !== action.data.UserId);                
                draft.unlikePostLoading=false;   
                draft.unlikePostDone=true;  
                break;
            }
            case UNLIKE_POST_FAIL:
                draft.unlikePostLoading=false;
                draft.unlikePostError=action.error;
                break;                             
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading=true;    
                draft.loadPostsDone=false;    
                draft.loadPostsError=null;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.loadPostsLoading=false;   
                draft.loadPostsDone=true;  
                draft.hasMorePost = draft.mainPosts.length < 50;
                break;
            case LOAD_POSTS_FAIL:
                draft.loadPostsLoading=false;
                draft.loadPostsError=action.error;
                break;            
            case ADD_POST_REQUEST:
                draft.addPostLoading=true;    
                draft.addPostDone=false;    
                draft.addPostError=null;
                break;
            case ADD_POST_SUCCESS:
               // draft.mainPosts.unshift(dummyPost(action.data));
                draft.mainPosts.unshift(action.data);
                draft.addPostLoading=false;   
                draft.addPostDone=true;  
                break;
            case ADD_POST_FAIL:
                draft.addPostLoading=false;
                draft.addPostError=action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading=true;    
                draft.removePostDone=false;    
                draft.removePostError=null;    
                break;
            case REMOVE_POST_SUCCESS:
                draft.mainPosts=draft.mainPosts.filter(v=>v.id!==action.data.PostId);
                draft.removePostLoading=false;
                draft.removePostDone=true;
                break;
            case REMOVE_POST_FAIL:
                draft.removePostLoading=false;
                draft.removePostError=action.error;  
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading=true;   
                draft.addCommentDone=false;   
                draft.addCommentError=null;   
                break;
            case ADD_COMMENT_SUCCESS:{
                //불변성은 바뀌는 것만바뀌고 안바뀌는 건 참조유지
                //action.data.content,action.data.postid,action.data.userid
                //해당게시글의 댓글에 접근하기위해 id를 찾는다
                const post = draft.mainPosts.findIndex(v=>v.id===action.data.PostId);
                post.Comments.unshift(action.data)
                draft.addCommentLoading=false;    
                draft.addCommentDone=true;
                break;                
            }
            case ADD_COMMENT_FAIL:
                draft.addCommentLoading=false;
                draft.addCommentError=action.error;
                break;
            default:
                break;
        }
    })

    /*
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
    }*/
}

export default reducer;