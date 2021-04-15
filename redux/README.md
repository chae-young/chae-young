## Redux<br><br>
## store<br><br>

    const reducer = (state,action) =>{

    }
    
    //store 생성
    const store = Redux.createStore(reducer)

### <br>
### getState<br><br>

store에서 현재 state를 가져와 render 시킨다. 

    function render () {
        const state = store.getState()
    }

### <br>
### subscribe<br><br>

store에서 render를 등록하여 데이터가 바뀔때마다 render해줌 

    store.subscribe(render)

### <br>
### dispatch<br><br>

사용자가 변경한 내용을 dispatch하면 reducer에 action을 전달한다.
 
    
    store.dispatch({type:''})

### <br>
### reducer<br><br>    

reducer는 호출할때 입력받은 state와 action 값을 받아 새로운 state를 return 해준다.