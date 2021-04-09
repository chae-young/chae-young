import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import Head from 'next/head';

const Profile = () => {
    const followerList = [{nickname:'채영'},{nickname:'바보'},{nickname:'노드버드오피셜'}];
    const followingList = [{nickname:'채영'},{nickname:'바보'},{nickname:'노드버드오피셜'}];

    return (
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                {/*<div>프로필</div>*/}
                <NicknameEditForm/>
                <FollowList header="팔로잉목록" data={followingList}/>
                <FollowList header="팔로워목록" data={followerList}/>
            </AppLayout>
        </>
    )
}

export default Profile