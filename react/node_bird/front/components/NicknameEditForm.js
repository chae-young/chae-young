import {useMemo,useCallback} from 'react';
import {Form,Input} from 'antd';
import useInput from '../hooks/useInput';
import { useDispatch,useSelector } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () =>{
    const {me} = useSelector((state)=>state.user);    
    const [nickname,onChangeNickname] = useInput(me?.nickname || '');
    const dispatch = useDispatch();

    const onSubmit = useCallback(()=>{
        dispatch({
            type:CHANGE_NICKNAME_REQUEST,
            data:nickname,
        })
    },[nickname])
    const style = useMemo(()=>(
        {
            marginBottom:20,
            border:'1px solid #000',
            padding:10
        }
    ),[])

    return(
        <Form style={style}>
            <Input.Search 
            value={nickname}
            onChange={onChangeNickname}
            addonBefore="닉네임" 
            enterButton="수정"
            onSearch={onSubmit}
            />
        </Form>
    )
}

export default NicknameEditForm;