const React = require('react');
const { useState,useRef,useEffect,useMemo,useCallback } = React;
//usememo 는 리턴값을 기억하고 usecallback은 함수자체를 기억
const Ball = require('./Ball')

function getWinNumbers(){
    
    const candidate = Array(45).fill().map( (v,i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0])
    }
    const bonusNumber = shuffle[shuffle.length-1];
    const winNumber = shuffle.slice(0,6).sort((p,c)=>p-c);

    return [...winNumber,bonusNumber]
}

const Lotto = () =>{
    const lottoNum = useMemo(() => getWinNumbers(),[]);//번호를 기억함.렌더링 한번만 되도록..인자값바뀌면 다시실행됨
    const [winNumber,setWinnum] = useState(lottoNum);
    const [winBall,setWinBall] = useState([]);
    const [bonus,setBonus] = useState(null);
    const [redo,setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(()=>{

        for(let i = 0;i<winNumber.length - 1;i++){
            timeouts.current[i] = setTimeout(()=>{
                setWinBall((prevState)=>
                    //console.log(prevState);
                    [...prevState,winNumber[i]]
                )
            },(i+1)*1000)
        }
        timeouts.current[6] = setTimeout(()=>{
            setBonus(winNumber[6]);
            setRedo(true);
        },7000)     
        
        return()=>{
            timeouts.current.forEach(v=>{
                clearTimeout(v)
            })            
        }
    },[timeouts.current])//빈배열이면 컴포넌트디드마운트랑 똑같음..time값 바뀌면 update실행


    //훅스는 계속 재실행되서 CALLBACK에 담아두면 새로생성되지 않는다
    //자식컴포넌트에 함수넣어줄경우 callback 넣어줘야함. 왜냐면 자식컴포넌트는 부모컴토넌트가 새로운 함수를 주는지 알기때문에..
    const onClickredo = useCallback(() =>{
        //초기화
        setWinnum(getWinNumbers());
        setWinBall([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    },[winNumber])//항상 첫번째 값을 기억해주기 때문에 만약 안에서 값이 필요한경우 배열값넣어주기    

    return(
        <>
            <div>당첨숫자</div>
            <div id="결과창">
                {winBall.map( v => <Ball key={v} number={v}/>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickredo}>한번더</button>}
        </>
    )
}


module.exports = Lotto; 