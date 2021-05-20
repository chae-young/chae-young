import PropTypes from 'prop-types';
import {useState,useCallback,useEffect } from 'react';
import {Form,Input,Button} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequestAction} from '../reducers/user'

//const style = useMemo(()=>( {marginTop:10} ),[])
//스타일컴포넌트 (인라인으로 할경우 리렌더링됨.) or usememo
const ButtonWrapper = styled.div`
    margin-top:10px;
`
const FormWrapper = styled(Form)`
    padding:10px;
`

const LoginForm = ( ) =>{
    const dispatch = useDispatch();

    const {loginLoading,loginError} = useSelector((state)=>state.user);
    const [email,onChangeEmail] = useInput('');
    const [password,onChangePassword] = useInput('');

    useEffect(()=>{
        if(loginError){
            alert(loginError)
        }
    },[loginError])

    const onSubmitForm = useCallback(()=>{
        //setIsLogined(true)
        dispatch(loginRequestAction({email,password}));
    },[email,password])

    return(
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required/>
            </div>
            <div>
                <label htmlFor="user-password">패스워드</label>
                <Input 
                name="user-password"
                type="password" 
                value={password} 
                onChange={onChangePassword} 
                required/>                
            </div>
            <ButtonWrapper>
                <Button Button type="primary" htmlType="submit" loading={loginLoading}>로그인</Button>
                <Link href="/singup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    )   
}


export default LoginForm;