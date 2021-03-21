import React , {useReducer,createContext,useMemo,useEffect} from 'react';
import Form from './Form'
import Table from './Table'

//contextAPI
export const CODE = {
    MINE:-7,
    NORMAL:-1,
    QUESTION:-2,
    FLAG:-3,
    QUESTION_MINE:-4,
    FLAG_MINE:-5,
    CLICKED_MINE:-6,
    OPEND:0//0이상이면 다 오픈
}
export const TableContext = createContext({
    //초기값
    tableData:[],
    halted:true,
    dispatch:()=>{}
});

const initialState = {
    tableData:[],
    data:{
        row:0,
        cell:0,
        mine:0
    },
    timer:0,
    result:'',
    halted:true, //게임상태
    openedCount:0
}

const plantMine = (row,cell,mine) =>{
    const candidate = Array(row*cell).fill().map((arr,i) => i)
    const shuffle = [];
    while(candidate.length > row*cell-mine){
        const chosen = candidate.splice( Math.floor(Math.random()*candidate.length),1 )[0];
        shuffle.push(chosen)
    }

    const data = [];
    for(let i = 0;i<row;i++){
        const rowData=[];
        data.push(rowData);
        for(let j = 0;j<cell;j++){
            rowData.push(CODE.NORMAL)
        }
    }

    for (let k = 0;k < shuffle.length;k++){
        const ver = Math.floor(shuffle[k]/cell);
        const her = shuffle[k]%cell;
        data[ver][her] = CODE.MINE
    }
    console.log(data)
    return data
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state,action) => {
    switch(action.type){
        case START_GAME:
            return{
                ...state,
                data:{
                    row:action.row,
                    cell:action.cell,
                    mine:action.mine
                },
                openedCount:0,
                tableData:plantMine(action.row,action.cell,action.mine),
                halted:false,
                timer: 0,
            }
        case OPEN_CELL:{
            const tableData = [...state.tableData];
            //tableData[action.row] = [...state.tableData[action.row]];
            //모든칸들을 복사
            tableData.forEach((row,i)=>{
                tableData[i]=[...row]
            })
            
            const checked =[];
            let openedCount = 0;
            //주변칸들은 검사하는 함수
            const checkAround = (row,cell) =>{
                //이미열린칸,지뢰는 열리지 않게
                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {//상하좌우필터링
                    return;
                  }                
                if([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])){
                    return;
                }
                if (checked.includes(row + '/' + cell)){//이미 검사한 칸이면(재귀방지)
                    return;
                }else{
                    checked.push(row + '/' + cell);
                }


                //opendCount+=1
                //주변칸 지뢰개수 검사
                let around=[
                    tableData[row][cell-1],
                    tableData[row][cell+1]                    
                ];
                if(tableData[row-1]){
                    around = around.concat(
                        tableData[row-1][cell-1],
                        tableData[row-1][cell],
                        tableData[row-1][cell+1]
                    )
                }  
                if(tableData[row+1]){
                    around = around.concat(
                        tableData[row+1][cell-1],
                        tableData[row+1][cell],
                        tableData[row+1][cell+1]
                    )
                }    
                //주변킨증에 지뢰있는칸 개수담기
                const count = around.filter((v)=>[CODE.MINE,CODE.FLAG_MINE,CODE.QUESTION_MINE].includes(v)).length;
                
                //클릭한 내가 지뢰0이면 주변 모두검사해서 클릭
                if(count===0){
                    if (row > -1) {//클릭한 칸의 젤 맨위 없애줌
                        const near = [];
                        if (row - 1 > -1) {
                          near.push([row -1, cell - 1]);
                          near.push([row -1, cell]);
                          near.push([row -1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        if (row + 1 < tableData.length) {//젤아래칸
                          near.push([row + 1, cell - 1]);
                          near.push([row + 1, cell]);
                          near.push([row + 1, cell + 1]);
                        }
                        near.forEach((n) => {//있는 칸들만 주변을 클릭
                          if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                            checkAround(n[0], n[1]);
                          }
                        })
                    } 
                }
                if (tableData[row][cell] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
                    openedCount += 1;
                }
                tableData[row][cell] = count;                
            }
            //tableData[action.row][action.cell] = CODE.OPEND;
            checkAround(action.row,action.cell)

            let halted = false;
            let result = '';
            if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){//승리(지뢰뺴고 열면 승리..)
                halted = true;
                result = '승리!'
            }
            return{
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result
            }
        }
        case CLICK_MINE:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE
            return{
                ...state,
                tableData,
                halted:true
            }
        } 
        case FLAG_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] == CODE.MINE){//지뢰면
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return{
                ...state,
                tableData,
            }
        }   
        case QUESTION_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] == CODE.FLAG_MINE){//깃발 지뢰면
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return{
                ...state,
                tableData,
            }
        } 
        case NORMALIZE_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] == CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            }else{
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return{
                ...state,
                tableData,
            }
        }
        case INCREMENT_TIMER: {
            return {
              ...state,
              timer: state.timer + 1,
            }
          }                                       
        default:
            return
    }
}
const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;

    const value = useMemo(() => {
        console.log(tableData == state.tableData)
        return { 
            tableData, halted, dispatch 
        }
        }, [tableData, halted]
    );
  
    useEffect(() => {
      let timer;
      if (halted === false) {
        timer = setInterval(() => {
          dispatch({ type: INCREMENT_TIMER });
        }, 1000);
      }
      return () => {
        clearInterval(timer);
      }
    }, [halted]);
  
    return (
        /*provider로 묶어줘야 그 아래 컴포넌트에 접근가능 */
      <TableContext.Provider value={value}>
        <Form />
        <div>{timer}</div>
        <Table />
        <div>{result}</div>
      </TableContext.Provider>
    );
};


export default MineSearch;