import {Form,Button,Input} from "antd";
import {useCallback,useEffect} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import useInput from '../hooks/useInput'
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const CommentForm = ({post}) => {
    const dispatch = useDispatch();
    const id = useSelector((state)=>state.user.me?.id);
    const addCommentDone = useSelector((state)=>state.post);
    const [commentText,onChangeCommentText,setCommetnText] = useInput('');

    useEffect(()=>{
        if(addCommentDone){
            setCommetnText('') 
        }
    },[addCommentDone])

    const onSubmitComment = useCallback(()=>{
        dispatch({
            type:ADD_COMMENT_REQUEST,
            data:{
                content:commentText,
                postId:post.id,
                userId:id
            }
        })
    },[commentText,id])
    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} row={4}/>
                <Button htmlType="submit">삐약</Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.propType = {
    post:PropTypes.object.isRequired,
}

export default CommentForm;