import {useState,useCallback} from 'react';
import {Card,Avatar,Button} from 'antd';

const UseerProfile = ( {setIsLogined} ) =>{

    const onLogout = useCallback(()=>{
        setIsLogined(false);
    },)

    return(
        <Card
            actions={[
                <div key="twitt">트위터 <br/>0</div>,
                <div key="folloing">팔로잉<br/>0</div>,
                <div key="follower">팔로워<br/>0</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>cy</Avatar>}
                title='채영'
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    )
}

export default UseerProfile;