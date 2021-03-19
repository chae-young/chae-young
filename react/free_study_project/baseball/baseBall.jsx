
const React = require('react');
const { PureComponent ,createRef } = require('react');
const Try = require('./try');

//this 안쓰면 밖에 뺀다
function getNumber(){//숫자 4개를 랜덤하게 겹치치않게 뽑는 함수
    const num = new Set();
    while(num.size<4){
        num.add(Math.floor(Math.random() * 9))
    }

    return [...num].sort()
}
console.log(getNumber())
class NumberBaseball extends PureComponent{
    state = {
        result:'',
        value:'',
        answer:getNumber(),
        tries:[],
    };
    onSubmitForm = (e)=> {
        const {result,value,tries,answer} = this.state;

        e.preventDefault();
        if(value === answer.join('')){
            this.setState((prevState)=>{//옛날state를 현재 state 롤 만들경우 함수형으로
                return{
                    result:'홈런',
                    tries:[...prevState.tries,{try:value,result:'홈런'}]
                }
            });
            alert('게임을 다시시작하세요');
            this.setState({
                value:'',
                answer:getNumber(),
                tries:[],                    
            })     
            this.input.current.focus();     
        }else{
            const answerArr = value.split('').map((v)=>{return parseInt(v)})

            let stlike = 0;
            let ball = 0;
            if(tries >= 9){//열번이상 틀렸을때
                this.setState({
                    result:`열번넘게틀려서 실패 답은${answer.join(',')}이다.`
                })
                alert('게임을 다시시작하세요');
                this.setState({
                    value:'',
                    answer:getNumber(),
                    tries:[],                    
                })
                this.input.current.focus();     
            }else{//열번 이하
                for(let i =0;i<4;i++){
                    if(answerArr[i] === answer[i]){
                        stlike+=1;
                    }else if(answer.includes(answerArr[i])){
                        ball+=1;
                    }
                }
                this.setState((prevState)=>{
                    return{
                        tries:[...prevState.tries,{try:value,result:`${stlike}스트라이크,${ball}볼`}],
                        value:'',
                    }
                })
                this.input.current.focus();     
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
    
    input = createRef();
    //onInputRef = (c) =>{ this.input = c}
    render(){//state 바뀔때마다 재실행
        const {result,value,tries} = this.state;
        return(
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.input} type="text" maxLength={4} value={value} onChange={this.onChangeInput}/>
                    <button>입력</button>
                </form>
                <div>시도:{tries.length}</div>
                <ul>

                    { tries.map((v,i)=>{
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