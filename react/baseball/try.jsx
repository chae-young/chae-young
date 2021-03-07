const { Component } = require('react');
const React = require('react');

class Try extends Component{
    render(){
        const {tryInfo} = this.props;
        return(
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        //<li><b>{this.props.value.fruits}</b>{this.props.value.taste}</li>
        )
    }
}

module.exports = Try