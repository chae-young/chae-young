const React = require('react');
const {PureComponent} = React;

class ResponsiveCheck extends PureComponent{
    state={
        state:'waiting',
        message:'클릭해서 시작하세요',
        result:[]
    }
    timeout;
    startTime;//렌더링 안되게
    endTime;
    onClickScreen = () =>{
        if(this.state.state === 'waiting'){
            this.setState({
                state:'ready',
                message:'초록색이되면 클릭하세요'
            })
            this.timeout = setTimeout( ()=>{
                this.setState({
                    state:'now',
                    message:'지금클릭'
                })
            this.startTime = new Date()
            },Math.floor(Math.random()*1000) + 2000)//2-3초 랜덤  
        }else if(this.state.state === 'ready'){//성급하게 클릭(초록색 되기전에)
            clearTimeout(this.timeout)
            this.setState({//반응속도 체크
                state:'waiting',
                message:'너무 성급하세용 초록색이 되면 클릭해주세요~',
                result:[]
            })
        }else if(this.state.state === 'now'){
            this.endTime = new Date()
            this.setState((prevState)=>{//반응속도 체크
                return{
                state:'waiting',
                message:'클릭해서 시작하세요',
                result:[...prevState.result,this.endTime - this.startTime]//옛날배열에 push 할경우 -> 전값놓고,새로운값 추가
                }
            })
        }
    }

    onReset = () =>{
        this.setState({
            result:[]
        })
    }

    renderAverage = () =>{
        //reduce가 빈배열이면 안먹기때문에 false일경우 처리 
        return this.state.result.length === 0 ? 
        null : <><div>평균시간:{this.state.result.reduce( (a,b)=> a+b ) / this.state.result.length}</div><button onClick={this.onReset}>리셋</button></>
        
    }

    render(){
        return(
            <>
                <div id="screen" className={this.state.state} onClick={this.onClickScreen}>
                    {this.state.message}
                </div>
                {/* 
                    render 에서 if ,for 문 못써서 if문 처리
                    값이 없을때는 결과가 안보이게 
                    jsx 에선 null false undefined 태그없을을 의미
                */}
                {this.renderAverage()}
                
            </>
        )
    }
}

module.exports = ResponsiveCheck