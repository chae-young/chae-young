const React = require('react');
const { Component } = React;
const Ball = require('./Ball')

function getWinNumbers(){
    console.log('getWin')
    const candidate = Array(45).fill().map( (v,i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0])
    }
    const bonusNumber = shuffle[shuffle.length-1];
    const winNumber = shuffle.slice(0,6).sort((p,c)=>p-c);
    return [...winNumber,bonusNumber]
}

class Lotto extends Component{
    state={
        winNumber:getWinNumbers(),
        winBall:[],
        bonus:null,
        redo:false
    }

    timeouts = [];

    //시작하자마자 뜨기
    componentDidMount(){
        for(let i = 0;i<this.state.winNumber.length - 1;i++){
            this.timeouts[i] = setTimeout((prevState)=>{
                return{
                    winBall:[...prevState.winBall,winNumber[i]]                    
                }
            },(i+1)*1000)
        }
        this.timeouts[6] = setTimeout(()=>{
            this.setState({
                bonus:winNumber[6],
                redo:true
            })
        },7000)
    }

    //setTime~제거. 아직발생하지않았지만..
    componentWillUnmount(){
        this.timeouts.forEach(v=>{
            clearTimeout(v)
        })
    }

    render(){
        const {winBall,bonus,redo} = this.state;
        return(
            <>
                <div>당첨숫자</div>
                <div id="결과창">
                    {winBall.map( v => <Ball key={v} number={v}/>)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus}/>}
                <button onClick={redo ? this.onClickredo : ()=> {}}한번더></button>
            </>
        )
    }
}
module.exports = Lotto; 