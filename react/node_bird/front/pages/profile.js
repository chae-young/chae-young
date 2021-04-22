import {useEffect} from 'react';
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import Head from 'next/head';
import { useSelector } from "react-redux";
import Router from "next/router";


const Profile = () => {
    const {me} = useSelector((state)=>state.user);

    //const followerList = [{nickname:'채영'},{nickname:'바보'},{nickname:'노드버드오피셜'}];
    //const followingList = [{nickname:'채영'},{nickname:'바보'},{nickname:'노드버드오피셜'}];
    useEffect(()=>{
        if(!(me&&me.id)){//현재페이지에서 로그아웃하면
            Router.push('/');
        }
    },[me&&me.id])

    if(!me){//로그인x )
        return null;
    }
    
    return (
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm/>
                 <FollowList header="팔로잉목록" data={me.Followings}/>
                <FollowList header="팔로워목록" data={me.Followers}/>
            </AppLayout>
        </>
    )
}

export default Profile