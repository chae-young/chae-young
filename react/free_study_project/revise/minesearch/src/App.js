import React,{createContext, useReducer} from 'react'
import Form from './Form'
import Table from './Table'
import './App.css';


export const TableContextApi = createContext({
  tableData:[],
});
export const CODE = {
  MINE:-7,
  NORMAL:-1,
  QUESTION:-2,
  FLAG:-3,
  QUESTION_MINE:-4,
  FLAG_MINE:-5,
  CLICKED_MINE:-6,
  OPEND:0//0이상이면 다 오픈
};

//테이블만들고 지뢰심기
const MakeAtable = (row,cell,mine) =>{
  const table = Array(row*cell).fill().map((arr,i)=>i)
  //지뢰만들기
  const mineArr = [];
  while(table.length>row*cell-mine){
    const put = table.splice( Math.floor(Math.random()*table.length),1 )[0];
    mineArr.push(put)
  }
  //기본값
  const data = [];
  for(let i = 0;i<row;i++){
      const rowData=[];
      data.push(rowData);
      for(let j = 0;j<cell;j++){
          rowData.push(CODE.NORMAL)
      }
  }
  //지뢰
  for (let i = 0;i < mineArr.length;i++){
    const ver = Math.floor(mineArr[i]/cell);
    const her = mineArr[i]%cell;
    data[ver][her] = CODE.MINE
  }
  console.log(data)
}  


//reducer 
export const START_GAME = 'START_GAME';
const reducer = (state,action) =>{
  switch(action.type){
    case START_GAME:
      return{
        ...state,
        tableData:MakeAtable(action.row,action.cell,action.mine)
      }
  }
}


//state 값
const initialState = {
  tableData:[],
  result:''
}

const App = () =>{
  const [state,dispatch] = useReducer(reducer,initialState);
  const {tableData} = state;

  return(
    <TableContextApi.Provider value={{tableData,dispatch}}>
      <Form/>
      <Table/>
    </TableContextApi.Provider>
  )
}

export default App;
