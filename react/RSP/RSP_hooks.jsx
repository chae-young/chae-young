
const React = require('react');
const {useState,useRef,useEffect} = React;

const coords = {
    바위:'0',
    가위:'-135px',
    보:'-285px',
}
const scores ={
    가위:1,
    바위:0,
    보:-1
}

const computerChoice = (imgCoord)=>{
    return Object.entries(coords).find( v => {
        return v[1] == imgCoord
    })[0]
}

const RSP = ()=>{
    const [result,setResult] = useState('');
    const [imgCoord,setImgCoord] = useState(coords.바위);
    const [score,setScore] = useState(0);
    const interval = useRef();

    useEffect(()=>{ //componentDidmount,componentDidUpdate 역할
        interval.current = setInterval(changeHand,1000)
        return ()=>{ //componentWillUnmount 역할
            clearInterval(interval.current)
        }
    },[imgCoord]) //배열인자값이 바뀔때마다 effect 가 실행됨

    const changeHand = () => {
        if(imgCoord == coords.바위){
            setImgCoord(coords.가위)
        } else if(imgCoord == coords.가위){
            setImgCoord(coords.보)
        } else if(imgCoord == coords.보){
            setImgCoord(coords.보)
        }        
    }    
    const onClickBtn = (choice) => ()=> { 
        clearInterval(interval.current);
        const myScore = scores['바위'];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff == 0){
            setResult('비겼습니다')
        }else if([-1,2].includes(diff)){
                setResult('이겼습니다');
                setScore((prevState)=>prevState.score + 1)
        }else{
            setResult('졌습니다');
            setScore((prevState)=>prevState.score * 1)          
        }
        setTimeout(()=>{
            interval.current = setInterval(changeHand,1000)        
        },2000)
    }

    return(
        <>
            <div id="computer" style={{ background:`url(https://sites.google.com/site/hafsrsp/_/rsrc/1468855017636/config/customLogo.gif?revision=2) ${imgCoord} 0`}}></div>
            <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
            <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            <div>{result}</div>
            <div>현재{score}점</div>
        </>
    )
}


module.exports = RSP;