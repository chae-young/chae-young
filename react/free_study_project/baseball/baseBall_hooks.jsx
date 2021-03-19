
const { useState } = require('react');
const React = require('react');
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

const NumberBaseball = () => {
    const [result,setResult] = useState();
    const [value,setValue] = useState();
    const [answer,setAnswer] = useState(getNumber());
    const [tries,setTries] = useState([]);

    const onSubmitForm = (e)=> {

        e.preventDefault();
        if(value === answer.join('')){
            setResult('홈런');
            setTries((prevState)=>{
                return [...prevState.tries,{try:value,result:'홈런'}]
            })
            alert('게임을 다시시작하세요');
            setValue('');
            setAnswer(getNumber())
            setTries([])
           
        }else{
            const answerArr = value.split('').map((v)=>{return parseInt(v)})

            let stlike = 0;
            let ball = 0;
            if(tries >= 9){//열번이상 틀렸을때
                setResult(`열번넘게틀려서 실패 답은${answer.join(',')}이다.`);
                alert('게임을 다시시작하세요');
                setValue('');
                setAnswer(getNumber())
                setTries([])
            }else{//열번 이하
                for(let i =0;i<4;i++){
                    if(answerArr[i] === answer[i]){
                        stlike+=1;
                    }else if(answer.includes(answerArr[i])){
                        ball+=1;
                    }
                }
                setTries((prevState)=>{
                    return [...tries,{try:value,result:`${stlike}스트라이크,${ball}볼`}]
                })
                setValue('')
            }
        }
    }
    const onChangeInput = (e)=> {
        setValue(e.target.value)
    }
 
    return(
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" maxLength={4} value={value} onChange={onChangeInput}/>
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
class NumberBaseball extends Component{
    state = {
        result:'',
        value:'',
        answer:getNumber(),
        tries:[],
    };

} 

module.exports = NumberBaseball