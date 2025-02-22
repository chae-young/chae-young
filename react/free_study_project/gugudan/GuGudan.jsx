const React = require('react');
const ReactDOM = require('react-dom');

class GuGuDan extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            first:Math.ceil(Math.random()*9),
            second:Math.ceil(Math.random()*9),
            value:'',
            result:'',
        }
    }
    onSubmit = (e)=>{
        e.preventDefault();
        if(parseInt(this.state.value) === this.state.first * this.state.second){
            /*
            this.setState({ //정답일경우 어떻게 바뀔지
                result:this.state.value+'정답',
                first:Math.ceil(Math.random()*9),
                second:Math.ceil(Math.random()*9),
                value:'',
            })
            */
           //예전의 값을 새로운 값으로 해줄경우 함수로 반환 ->setState은에 this.state 가 들어갈경우
           this.setState( (prevState)=>{
               return{
                   result:prevState.value+'정답',
                   first:Math.ceil(Math.random()*9),
                   second:Math.ceil(Math.random()*9),
                   value:'',
               }
           } )
           this.input.focus()
        }else{
            this.setState({
                value:'',
                result:'꽝',
            })      
           this.input.focus()

        }
    }
    onChange = (e)=> { //입력값
        this.setState({value:e.target.value})
    }
    input;
    onrefInput = (c)=>{this.input = c}
//this 는 class
    render(){
        /*
        return 에 중괄호 안넣어도됨
        감싸주는 div를 빈태그로 가능 <> => 안되면 React.Fragment 로 가능
        ref => dom에 직접 접근하고 싶을때
        */
        return(
            <>
                <div>{this.state.first}곱하기{this.state.second}는?</div>
                <form onSubmit={ this.onSubmit }>
                    <input ref={ this.onrefInput } type="number" value={this.state.value} onChange={ this.onChange }/>
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        )
    }
}


module.exports = GuGuDan;//client 쓰이고있음