import {useCallback} from 'react';
import {Button} from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({post})=>{
    const dispatch = useDispatch();
    const {me,followLoading,unfollowLoading} = useSelector((state)=>state.user);
    const isFollowing = me?.Followings.find(v=>v.id===post.User.id);

    const onClickButton = useCallback(()=>{
        if(isFollowing){
            dispatch({type:UNFOLLOW_REQUEST,data:post.User.id})
        }else{
            dispatch({type:FOLLOW_REQUEST,data:post.User.id})
        }
    },[isFollowing])

    if(post.User.id === me.id){//포스트아이디랑 내아이디랑 같으면 팔로우버튼 안보이게
        return null
    }
    
    return(
        <Button onClick={onClickButton}>{isFollowing ? '언팔로우':'팔로우'}</Button>
    )
}

FollowButton.PropTypes = {
    post:PropTypes.object.isRequired,
}
export default FollowButton;