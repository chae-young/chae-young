//페이지들의 공통된것 처리 component 안에 js파일들이 들어감.

import propTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css'
import wrapper from '../store/configureStore'

const App = ( {Component} ) => {
    return(
        <>{/* 버전업데이트 이후 provider 없어도 됨 */}
            <Head>
                <meta charSet="utf-8"/>
                <title>NodeBird</title>
            </Head>
            <Component/>
        </>
    )
}

App.propTypes = {
    Component:propTypes.elementType.isRequired
}

export default wrapper.withRedux(App);