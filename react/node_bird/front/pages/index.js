import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const HOME = () => {
    const {isLoggedin} = useSelector((state)=>state.user);
    const {mainPosts} = useSelector((state)=>state.post);

    return (
        <AppLayout>
            {isLoggedin && <PostForm/>}
            {mainPosts.map((post,index)=><PostCard key={post.id} post={post}/>)}
            
        </AppLayout>
    )
}

export default HOME;