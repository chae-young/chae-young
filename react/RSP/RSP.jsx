
const React = require('react');
const {Component} = React;

/*클래스의경우
consturctor -> render -> ref -> componentDidMount -> setState,props바뀔때 -> shouldComponentUpdate(true) ->render -> componentDidUpdate
부모가 나를 없앴을떄 componentWillUnmount -> 소멸
*/
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

class RSP extends Component{
    state={
        result:'',
        imgCoord:0,
        score:0,
    }
    interval;
    //render함수가 성공정으로 실행되면 실행됨->처음 렌더가 실행될경우에만! 
    //비동기요청
    componentDidMount(){
        
        this.interval = setInterval(this.changeHand,1000)
    }
    componentDidUpdate(){//리렌더링 후

    }
    changeHand = () => {
        const {imgCoord} = this.state;

        if(imgCoord == coords.바위){
            this.setState({
                imgCoord:coords.가위
            })
        } else if(imgCoord == coords.가위){
            this.setState({
                imgCoord:coords.보
            })
        } else if(imgCoord == coords.보){
            this.setState({
                imgCoord:coords.바위
            })
        }        
    }
    //비동기요청 정리
    componentWillUnmount(){//컴포넌트가 제거되기 직전 .. 부모가 자식을 없앴을때
        clearInterval(this.interval)
    }
    
    onClickBtn = (choice) => ()=> { //()=>this.onClickBtn('바위') onclick 메서드안에 함수호출을 두번째에 넣어줌
        const {imgCoord} = this.state
        clearInterval(this.interval);
        const myScore = scores['바위'];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff == 0){
            this.setState({
                result:'비겼습니다'
            })
        }else if([-1,2].includes(diff)){
            this.setState((prevState)=>{
                return{
                    result:'이겼습니다',
                    score:prevState.score + 1
                }
            })
        }else{
            this.setState((prevState)=>{
                return{
                    result:'졌습니다',
                    score:prevState.score - 1
                }
            })            
        }
        setTimeout(()=>{

            this.interval = setInterval(this.changeHand,1000)        
        },2000)
    }

    render(){
        const {result,score,imgCoord} = this.state;
        return(
            <>
                <div id="computer" style={{ background:`url(https://sites.google.com/site/hafsrsp/_/rsrc/1468855017636/config/customLogo.gif?revision=2) ${imgCoord} 0`}}></div>
                <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                <div>{result}</div>
                <div>현재{score}점</div>
            </>
        )
    }
}

module.exports = RSP;