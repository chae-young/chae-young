import {useCallback,useState} from 'react';
import { Card,Popover,Button,Avatar,List,Comment } from "antd";
import PropTypes from 'prop-types';
import {RetweetOutlined,HeartOutlined,HeartTwoTone,MessageOutlined,EllipsisOutlined} from '@ant-design/icons';
//import ButtonGroup from "antd/lib/button/button-group";
import { useDispatch, useSelector } from "react-redux";
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

const PostCard = ({post}) =>{
    //const me = useSelector((state)=>state.user);
    //const id = me?.id //옵셔널체이닝->me.id가 있으면 값들어가고 없으면 undefined 
    const dispatch = useDispatch();
    const [liked,setLiked] = useState(false);
    const [commentFormOpend,setcommentFormOpend] = useState(false);
    const onToggleLike = useCallback(()=>{
        setLiked((prev)=>!prev)//false-->true 로 
    },[])
    const onToggleComment = useCallback(()=>{
        setcommentFormOpend((prev)=>!prev)//false-->true 로 
    },[])    
    const id = useSelector((state)=>state.user.me?.id);

    const onRemovePost = useCallback(()=>{
        dispatch({type:REMOVE_POST_REQUEST,data:post.id})
    })
    return (
        <>
            <Card 
                cover={post.Images[0]&&<PostImages images={post.Images}/>}
                actions={[
                    <RetweetOutlined key="retweet"/>,
                    liked 
                        ? <HeartTwoTone twoToneColor="red" key="heart" onClick={onToggleLike}/> 
                        : <HeartOutlined key="heart" onClick={onToggleLike}/>,
                    <MessageOutlined key="comment" onClick={onToggleComment}/>,  
                    <Popover key="more " 
                        content={(
                            <Button.Group>
                                {id && 
                                post.User.id === id ? (<><Button>수정</Button><Button type="danger" onClick={onRemovePost}>삭제</Button></>) :
                                <Button>신고</Button>}       
                            </Button.Group>
                        )}>
                        <EllipsisOutlined />
                    </Popover>,
                ]}
                extra={id && <FollowButton post={post}/>}
            >
                <Card.Meta description={<PostCardContent postData={post.content}/>} title={post.User.nickname} avatar={<Avatar>post.User.nickname[0]</Avatar>}/>
            
            </Card>
            {commentFormOpend && 
                (<div>
                    <CommentForm post={post}/>
                    <List
                        header={`${post.Comments.length} 개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item)=>(
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>)
            }
            {/* {<CommentForm/>} */}
            {/* {<Comments/>} */}
        </>
    )
}

PostCard.propTypes = {
    post:PropTypes.shape({
        id:PropTypes.number,
        User:PropTypes.object,
        content:PropTypes.string,
        createdAt:PropTypes.object,
        Comments:PropTypes.arrayOf(PropTypes.object),
        Images:PropTypes.arrayOf(PropTypes.object),
    }).isRequired
}
export default PostCard;