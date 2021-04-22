import {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import {LOAD_POSTS_REQUEST} from '../reducers/post';  

const HOME = () => {
    const {me} = useSelector((state)=>state.user);
    const {mainPosts,hasMorePost,loadPostsLoading} = useSelector((state)=>state.post);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type:LOAD_POSTS_REQUEST})
    },[])

    //스크롤 끝점에 다시 로딩
    useEffect(()=>{
        function onScroll(){

            console.log(window.scrollY,'화면 보이는 길이',document.documentElement.clientHeight,'총 길이', document.documentElement.scrollHeight)
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight-300){//300px정도 남은상태에서 로딩
                if(hasMorePost && !loadPostsLoading){//로딩이 아닐때만 실행하도록
                    dispatch({type:LOAD_POSTS_REQUEST})
                }
            }
        }
        window.addEventListener('scroll',onScroll)
        return()=>{//해제
            window.removeEventListener('scroll',onScroll)
        }
    },[hasMorePost,loadPostsLoading])
    return (
        <AppLayout>
            {me && <PostForm/>}
            {mainPosts.map((post,index)=><PostCard key={post.id} post={post}/>)}
            
        </AppLayout>
    )
}

export default HOME;