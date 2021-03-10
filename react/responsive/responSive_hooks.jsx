const React = require('react');
const { useState,useRef } = React;
const {PureComponent} = React;

const ResponsiveCheck = () => {
    /*usestate는 return 부분이 다시실행되지만 ref는 실행되지 않는다
        값이 바뀌어도 렌더링 시키고 싶지 않는 값들은 ref에 넣어서 사용  
    */
    const [state,setState] = useState('waiting');
    const [message,setMessage] = useState('클릭해서 시작하세요');
    const [result,setResult] = useState([]);
    const timeout = useRef(null);//hook에서 사용,current 와 함께
    const startTime = useRef();
    const endTime = useRef();
    
    const onClickScreen = () => {
        if(state === 'waiting'){
            setState('ready');
            setMessage('초록색이되면 클릭하세요');
            
            timeout.current = setTimeout( ()=>{
                setState('now');
                setMessage('지금클릭');
            startTime.current = new Date()
            },Math.floor(Math.random()*1000) + 2000)//2-3초 랜덤  
        }else if(state === 'ready'){//성급하게 클릭(초록색 되기전에)
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('너무 성급하세용 초록색이 되면 클릭해주세요~');            

        }else if(state === 'now'){
            endTime = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');      
            setResult((prevResult)=>{
                return [...prevResult,endTime.current - startTime.current]
            })          
        }   
    }
    const onReset = () => {
        setResult([])
    }
    const renderAverage = () =>{
        //reduce가 빈배열이면 안먹기때문에 false일경우 처리 
        return result.length === 0 ? 
        null : <><div>평균시간:{result.reduce( (a,b)=> a+b ) / result.length}</div><button onClick={onReset}>리셋</button></>
        
    }
    return(
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {/* 
                render 에서 if ,for 문 못써서 if문 처리
                값이 없을때는 결과가 안보이게 
                jsx 에선 null false undefined 태그없을을 의미
            */}
            {renderAverage()}
            
        </>
    )
}


module.exports = ResponsiveCheck