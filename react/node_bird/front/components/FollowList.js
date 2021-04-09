import propTypes from 'prop-types';
import {List, Button, Card} from 'antd';
import {SyncOutlined} from '@ant-design/icons';

const FollowList = ( {header,data} ) =>{
    return(
        <List
            grid={{gutter:10,xs:2,md:3}}
            header={<div>{header}</div>}
            loadMore={<div><Button>더보기</Button></div>}
            dataSource={data}
            renderItem={item=>(//data
                <List.Item>
                    <Card actions={[<SyncOutlined spin key="이미지"/>]}>
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