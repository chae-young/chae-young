import React , {useReducer,createContext,useMemo} from 'react';
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
    disapath:()=>{}
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
    opendCount:0
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
                tableData:plantMine(action.row,action.cell,action.mine),
                halted:false
            }
        case OPEN_CELL:{
            const tableData = [...state.tableData];
            //tableData[action.row] = [...state.tableData[action.row]];
            //모든칸들을 복사
            tableData.forEach((row,i)=>{
                tableData[i]=[...row]
            })
            
            const checked =[];
            let opendCount = 0;
            //주변칸들은 검사하는 함수
            const checkAround = (row,cell) =>{
                //이미열린칸,지뢰는 열리지 않게
                if([CODE.OPEND,CODE.FLAG_MINE,CODE.QUESTION_MINE,CODE.QUESTION].includes(tableData[row][cell])){
                    return;
                }
                if(row<0 || row>tableData.length || cell<0 || cell>tableData[0].length){//상하좌우필터링
                    return
                }
                if(checked.includes(row+','+'cell')){//이미 검사한 칸이면(재귀방지)
                    return;
                }else{
                    checked.push(row+','+'cell')
                }


                opendCount+=1
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
                around = around.concat(
                    tableData[row][cell-1],
                    tableData[row][cell+1]
                )    
                if(tableData[row-1]){
                    around = around.concat(
                        tableData[row+1][cell-1],
                        tableData[row+1][cell],
                        tableData[row+1][cell+1]
                    )
                }    
                //주변킨증에 지뢰있는칸 개수담기
                const count = around.filter((v)=>[CODE.MINE,CODE.FLAG_MINE,CODE.QUESTION_MINE].includes(v)).length;    
                tableData[row][cell] = count;
                
                //클릭한 내가 지뢰0이면 주변 모두검사해서 클릭
                if(count===0){
                    const near = [];
                    if(row-1>-1){//클릭한 칸의 젤 맨위 없애줌
                        near.push([row-1,cell-1]);
                        near.push([row-1,cell]);
                        near.push([row-1,cell+1]);
                    }
                    near.push([row,cell-1])
                    near.push([row,cell+1])
                    if(row+1>tableData.length){//젤아래칸
                        near.push([row+1,cell-1]);
                        near.push([row+1,cell]);
                        near.push([row+1,cell+1]);                        
                    }
                    near.forEach((n)=>{//있는 칸들만 주변을 클릭
                        console.log(tableData[n[0]])
                        if(tableData[n[0]][n[1]] !== CODE.OPEND){//내가 클릭을하고 주변칸이 닫혀있는 경우에만
                            checkAround(n[0],n[1])
                        }
                    })
                }else{

                }
            }
            //tableData[action.row][action.cell] = CODE.OPEND;
            checkAround(action.row,action.cell)
            let halted = false;
            let result = '';
            if(state.row*state.cell-state.mine === state.opendCount + opendCount){//승리(지뢰뺴고 열면 승리..)
                halted = true;
                result = '승리!'
            }
            return{
                ...state,
                tableData,
                opendCount:state.opendCount+count,
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
        default:
            return
    }
}

const MineSearch = () =>{
    const [state,disapath] = useReducer(reducer,initialState);

    const value = useMemo( ()=> ({tableData:state.tableData,halted:state.halted,disapath}),[state.tableData,state.halted])//inline에 쓰면 매번렌더링되기 때문에 memo로 기억

    return(
        /*provider로 묶어줘야 그 아래 컴포넌트에 접근가능 */
        <TableContext.Provider value={ value }>
            <Form/>
            <div>{state.timer}</div>
            <Table/>
            <div>{state.result}</div>
        </TableContext.Provider>
    )
}

export default MineSearch;