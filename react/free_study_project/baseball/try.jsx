const React = require('react');
const { PureComponent } = React;

class Try extends PureComponent{
    /*
    constructor(props){//컨스트럭터 사용할경우 ..좀더 세세한 작업이 필요할때
        super(props)
        //props state 만들어주기
        state={         
            result:this.props.result
        }
    }*/
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