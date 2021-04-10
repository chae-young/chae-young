import {useState} from 'react';
import PropTypes from 'prop-types'; 
import Link from 'next/link';
import {Menu,Input,Row,Col} from 'antd';
import styled from 'styled-components';
import {useSelector} from 'react-redux';


import UseerProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';

const SearchInput = styled(Input.Search)`
    vertical-align:middle;
`;

//일부가 공통인것들은 여기!
const AppLayout = ( {children} ) =>{
    //const [isLogined,setIsLogined] = useState(false) //로그인 더미데이터
    //isloggedin이 바뀌면 컴포넌트가 리렌더링됨
    const {isLoggedin} = useSelector((state)=>state.user)


    return(
        <div>
            <Menu mode="horizontal">
                <Menu.Item><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item><SearchInput/></Menu.Item>
                <Menu.Item><Link href="/signup"><a>회원가입</a></Link></Menu.Item>
            </Menu>
            <Row gutter={8}>{/*간격*/}
                <Col xs={24} md={6}>
                    {isLoggedin ? <UseerProfile/> : <LoginForm/>}
                </Col>
                <Col xs={24} md={12}>{ children }</Col>
                <Col xs={24} md={6}>
                    <a href="https://www.naver.com" target="_blank" rel="noreferrer noopener">주소</a>
                </Col>
            </Row>
            
        </div>
    )
}

AppLayout.propTypes = {
    children:PropTypes.node.isRequired,
}

export default AppLayout;