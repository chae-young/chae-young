import {useCallback,useState,useEffect,useRef} from 'react';
import {Form, Input, Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import {addPost,UPLOAD_IMAGES_REQUEST} from '../reducers/post';

const postForm = () =>{
    const dispatch = useDispatch();
    const imageInput = useRef();
    const {imagePaths,addPostDone} = useSelector((state)=>state.post);
    const [text,onChangeText,setText] = useInput('');

    useEffect(()=>{
        if(addPostDone){
            setText('') 
        }
    },[addPostDone])
    
    const onSubmit = useCallback(()=>{
        dispatch(addPost(text))
    },[text]);
    
    const imageInputUpload = useCallback(()=>{
        imageInput.current.click()
    },[imageInput.current])

    const onChangeImages = useCallback((e)=>{
        console.log('images',e.target.files)
        const imagesFormData = new FormData();//로 보내야 멀티파트형식으로 서버로 보낼수있다.
        //file이 유사배열이라 배열바꿔주기
        [].forEach.call(e.target.files,(f)=>{
            imagesFormData.append('image',f)//key랑 값 ->서버랑 일치해야함
        })
        dispatch({
            type:UPLOAD_IMAGES_REQUEST,
            data:imagesFormData
        })
    })

    return(
        <Form style={{margin:'10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea
                value={text} 
                onChange={onChangeText} 
                maxLength={140} 
                placeholder="어떤 신기한 일이 있었나요?"
            />
            <div>
                <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} /><Button onClick={imageInputUpload}>이미지업로드</Button>
                <Button type="primary" htmlType="submit" style={{float:'right'}}>짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v)=>{
                    return <div key={v} style={{display:'inline-block'}}>
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