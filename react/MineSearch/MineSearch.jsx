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
    timer:0,
    result:'',
    halted:true //게임상태
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
                tableData:plantMine(action.row,action.cell,action.mine),
                halted:false
            }
        case OPEN_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPEND
            return{
                ...state,
                tableData
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