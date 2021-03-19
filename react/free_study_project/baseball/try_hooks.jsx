const React = require('react');
const { memo, useState } = require('react');//pure컴포넌트대신

const Try = memo(( { tryInfo } ) => {//props 자리

    //props를 바꾸고 싶을경우..원래 props는 부모가 바꿔야함..
    //부모로 받은 props를 바꾸고 싶을경우 state를 만들고 state를 바꾼다
    const [result,setResult] = useState(tryInfo.result)
    const onClick = () =>{
        setResult('');
    }
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    //<li><b>{this.props.value.fruits}</b>{this.props.value.taste}</li>
    )
})


module.exports = Try