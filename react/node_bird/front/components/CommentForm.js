import {Form,Button,Input} from "antd";
import {useCallback} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import useInput from '../hooks/useInput'

const CommentForm = ({post}) => {
    const id = useSelector((state)=>state.user.me?.id)
    const [commentText,onChangeCommentText] = useInput('');

    const onSubmitComment = useCallback(()=>{
        
    },[commentText])
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