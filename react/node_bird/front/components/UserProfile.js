import {useState,useCallback} from 'react';
import {Card,Avatar,Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {logOutRequestAction} from '../reducers/user';

const UserProfile = () =>{
    const dispatch = useDispatch();
    const {me,isLoggingOut} = useSelector((state)=>state.user);
    const onLogout = useCallback(()=>{
        dispatch(logOutRequestAction())
    },[])

    return(
        <Card
            actions={[
                <div key="twitt">트위터 <br/>0</div>,
                <div key="folloing">팔로잉<br/>0</div>,
                <div key="follower">팔로워<br/>0</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogout} loading={isLoggingOut}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile;