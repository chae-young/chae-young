import {useCallback,useState,useRef} from 'react';
import {Form, Input, Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import {addPost} from '../reducers/post';

const postForm = () =>{
    const dispatch = useDispatch();
    const imageInput = useRef();
    const {imagePaths} = useSelector((state)=>state.post);
    const [text,onChangeText] = useInput('');
    const onSubmit = useCallback(()=>{
        dispatch(addPost)
    },[]);
    const imageInputUpload = useCallback(()=>{
        imageInput.current.click()
    },[imageInput.current])

    return(
        <Form style={{margin:'10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea
                value={text} 
                onChange={onChangeText} 
                maxLength={140} 
                placeholder="어떤 신기한 일이 있었나요?"
            />
            <div>
                <input type="file" multiple hidden ref={imageInput} /><Button onClick={imageInputUpload}>이미지업로드</Button>
                <Button type="primary" htmlType="submit" style={{float:'right'}}>짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v)=>{
                    <div ket={v} style={{display:'inline-block'}}>
                        <img src={v} style={{width:'200px'}} alt={v}/>
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                })}
            </div>
        </Form>
    )
}

export default postForm;