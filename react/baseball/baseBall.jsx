
const { Component } = require('react');
const React = require('react');
const Try = require('./try');

function getNumber(){//숫자 4개를 랜덤하게 겹치치않게 뽑는 함수
    const num = new Set();
    while(num.size<4){
        num.add(Math.floor(Math.random() * 9))
    }

    return [...num].sort()
}
console.log(getNumber())
class NumberBaseball extends Component{
    state = {
        result:'',
        value:'',
        answer:getNumber(),
        tries:[],
    };
    onSubmitForm = (e)=> {
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')){
            this.setState({
                result:'홈런',
                tries:[...this.state.tries,{try:this.state.value,result:'홈런'}]
            })
            alert('게임을 다시시작하세요');
            this.setState({
                value:'',
                answer:getNumber(),
                tries:[],                    
            })            
        }else{
            const answerArr = this.state.value.split('').map((v)=>{return parseInt(v)})
            console.log(answerArr)
            let stlike = 0;
            let ball = 0;
            if(this.state.tries >= 9){//열번이상 틀렸을때
                this.setState({
                    result:`열번넘게틀려서 실패 답은${this.state.answer.join(',')}이다.`
                })
                alert('게임을 다시시작하세요');
                this.setState({
                    value:'',
                    answer:getNumber(),
                    tries:[],                    
                })
            }else{//열번 이하
                for(let i =0;i<4;i++){
                    if(answerArr[i] === this.state.answer[i]){
                        stlike+=1;
                    }else if(this.state.answer.includes(answerArr[i])){
                        ball+=1;
                    }
                }
                this.setState({
                    tries:[...this.state.tries,{try:this.state.value,result:`${stlike}스트라이크,${ball}볼`}],
                    value:'',
                })
            }
        }
    }
    onChangeInput = (e)=> {
        this.setState({
            value:e.target.value
        })
    }
    fruits = [
        /*['사과',' 빨갛다'],
        ['바나나',' 노랗다'],*/
        {fruits:'사과',taste:'빨갛다'},
        {fruits:'바나나',taste:'노랗다'},
        {fruits:'사과',taste:'빠알갛다'}
    ]    
    render(){//state 바뀔때마다 재실행
        return(
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                    <button>입력</button>
                </form>
                <div>시도:{this.state.tries.length}</div>
                <ul>

                    { this.state.tries.map((v,i)=>{
                        return(
                            //<li key={v.fruits + v.taste}><b>{v[0]}</b>{v[1]}</li>
                            /*
                                key 값을 고유한 값으로 만들어줘야 함
                            */                            
                        
                            <Try key={`${i+1}차시도`} tryInfo={v} index={i}/>//props 인자값 전달, props 는 자식임. 부모는 numberbase~
                        )
                    }) }
                </ul>
            </>
        )
    }
} 

module.exports = NumberBaseball