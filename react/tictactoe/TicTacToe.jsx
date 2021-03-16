import React ,{ useState,useEffect,useReducer,useCallback } from 'react'
import Table from './Table'

/*useReducer state가 너무 많아지면 관리가 힘들기 때문에 하나로 줄여주는..*/
const initialState = {
    winner:'',
    turn:'o',
    tableData:[
        ['','',''],['','',''],['','','']
    ],
    recentCell:[-1,-1]//없는칸
}


//액션의 이름은 대문자로
//모듈로 만들어서 불러오게끔
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const SET_TURN = 'SET_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state,action) =>{
    switch(action.type){
        case SET_WINNER:
            return{//기존꺼를 얕은복사후 바뀔부분만 바꿔줘야 함(새로운 state 만들어서 리턴)
                ...state,
                winner:action.winner
            };
        case CLICK_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; 
            tableData[action.row][action.cell] = state.turn; 
            return{
                ...state,
                tableData,
                recentCell:[action.row,action.cell]//최근에 클릭한 셀 
            }
        }
        case SET_TURN:
            return{
                ...state,
                turn:state.turn === 'o' ? 'x' : 'o'
            }
        case RESET_GAME:
            return{
                ...state,
                turn:'o',
                tableData:[
                    ['','',''],['','',''],['','','']
                ],
                recentCell:[-1,-1]                
            }
        default:
            return state;
    }
}

const TicTacToe = () =>{
    const [state,dispatch] = useReducer(reducer,initialState);
    // const [winner,setWinner] = useState('');
    // const [turn,setTurn] = useState('o');
    // const [tableData,setTableData] = useState([['','',''],['','',''],['','','']]);
    //비동기 state 가 바뀌었을때useeffect 사용
    const {tableData,turn,recentCell} = state;    

    useEffect(()=>{
        const [row,cell]=recentCell;
        if(row<0){//처음에 실행되는 거 방지
            return;
        }
        let win = false;
        if(tableData[row][0] === turn &&
            tableData[row][1] === turn &&
            tableData[row][2] === turn 
        ){
            win = turn;
        }
        if(tableData[0][cell] === turn &&
            tableData[1][cell] === turn &&
            tableData[2][cell] === turn 
        ){
            win = turn;
        }
        if(tableData[0][0] === turn &&
            tableData[1][1] === turn &&
            tableData[2][2] === turn 
        ){
            win = turn;
        }   
        if(tableData[0][2] === turn &&
            tableData[1][1] === turn &&
            tableData[2][0] === turn 
        ){
            win = turn;
        }          
        if(win){//승리시
            dispatch({type:SET_WINNER,winner:turn})
            dispatch({type:RESET_GAME})
        }else{//무승부시
            let all = true;//true면 무승부
            tableData.forEach(row =>{
                row.forEach(cell=>{
                    if(!cell){
                        all = false;
                    }
                })
            })
            if(all){
                dispatch({type:RESET_GAME})
            }else{

                dispatch({type:SET_TURN})
            }
        }
    },[recentCell])//가 바뀌었을때 실행


    //컴포넌트에 들어가는 함수는 usecallback!
    const onClickTable = useCallback(() =>{
        //액션이 실행될때마다 reducer가 실행
        dispatch({type:SET_WINNER,winner:'o'})//객체가 action 객체가되고 dispath가 action을 실행
    },[]);

    return(
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/>
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    )
}

export default TicTacToe;