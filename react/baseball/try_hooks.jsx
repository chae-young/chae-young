const { Component } = require('react');
const React = require('react');

const Try = ( { tryInfo } ) => {//props 자리
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    //<li><b>{this.props.value.fruits}</b>{this.props.value.taste}</li>
    )
}


module.exports = Try