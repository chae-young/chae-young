const { PureComponent } = require("react");

shouldComponentUpdate(nextProps,nextState,nextContext){
    if(this.state.num !== nextState.num){//현재 미래가 바뀌면 렌더링 해주고 안바뀌면 x
        return true;
    }
    return false;
}

//다른방법
Component - > PureComponent 로 바꾸기
대신 참조(객체,배열)은 알아채리지 못해서
기존 배열일 경우 항상 새로운값 추가해줄것