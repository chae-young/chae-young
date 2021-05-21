import propTypes from 'prop-types';
import {List, Button, Card} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST,REMOVE_FOLLOWER_REQUEST } from '../reducers/user';

const FollowList = ( {header,data} ) =>{
    const dispatch = useDispatch();
    const onCancel = (id) => ()=>{
        if(header == '팔로잉'){
            dispatch({
                type:UNFOLLOW_REQUEST,
                data:id,
            })
        }
        dispatch({
            type:REMOVE_FOLLOWER_REQUEST,
            data:id,
        })        
    }
    return(
        <List
            grid={{gutter:10,xs:2,md:3}}
            header={<div>{header}</div>}
            loadMore={<div><Button>더보기</Button></div>}
            dataSource={data}
            renderItem={item=>(//data
                <List.Item>
                    <Card actions={[<SyncOutlined spin key="이미지"/>]} onClick={onCancel(item.id)}>
                        <Card.Meta description={item.nickname}/>
                    </Card>
                </List.Item>
            )}
        />
    )
}

FollowList.propTypes = {
    header:propTypes.string.isRequired,
    data:propTypes.array.isRequired,
}

export default FollowList;