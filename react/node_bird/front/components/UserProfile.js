import {useState,useCallback} from 'react';
import {Card,Avatar,Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {logOutRequestAction} from '../reducers/user';

const UserProfile = () =>{
    const dispatch = useDispatch();
    const {me,logOutLoading} = useSelector((state)=>state.user);
    const onLogout = useCallback(()=>{
        dispatch(logOutRequestAction())
    },[])

    return(
        <Card
            actions={[
                <div key="twitt">트위터 <br/>{me.Posts.length}</div>,
                <div key="folloing">팔로잉<br/>{me.Followings.length}</div>,
                <div key="follower">팔로워<br/>{me.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogout} loading={logOutLoading}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile;