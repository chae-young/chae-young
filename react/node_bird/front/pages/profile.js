import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import Head from 'next/head';
import { useSelector } from "react-redux";

const Profile = () => {
    const me = useSelector((state)=>state.user);

    //const followerList = [{nickname:'채영'},{nickname:'바보'},{nickname:'노드버드오피셜'}];
    //const followingList = [{nickname:'채영'},{nickname:'바보'},{nickname:'노드버드오피셜'}];

    return (
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                {/*<div>프로필</div>*/}
                <NicknameEditForm/>
                <FollowList header="팔로잉목록" data={me.followings}/>
                <FollowList header="팔로워목록" data={me.followers}/>
            </AppLayout>
        </>
    )
}

export default Profile