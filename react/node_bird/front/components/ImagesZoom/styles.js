import styled from 'styled-components';

export const Overlay = styled.div`
    position:fixed;
    left:0;
    top:0;
    bottom:0;
    right:0;
    z-index:9999;
    background:white;
    height:100vh;
    
    & img{
        max-width:100%;
    }
`
export const Header = styled.header`
    height:44px;
    background:white;
    position:relative;
    padding:0;
    text-align:center;

    & h1{
        margin:0;
        font-size:17px;
        line-height:44px;
    }

    & button{
        position:absolute;
        right:0;
        top:0;
        padding:15px;
        line-height:14px;
        cursor:pointer;
    }
`
export const Indicator = styled.div`
    position:absolute;
    left:50%;
    bottom:20px;
    transform:translateX(-50%);
    padding:5px 20px;
    border-radius:15px;
    border:1px solid #000;
`