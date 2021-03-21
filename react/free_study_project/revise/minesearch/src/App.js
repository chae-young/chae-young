import React,{createContext, useReducer} from 'react'
import Form from './Form'
import Table from './Table'
import './App.css';


export const TableContextApi = createContext({
  tableData:[]
});

const initialState = {
  tableData:[],
  result:''
}


export const START_GAME = 'START_GAME';
const reducer = (state,action) =>{
  switch(action.type){
    case START_GAME:
      console.log(action.cell)
  }
}

const App = () =>{
  const [state,dispatch] = useReducer(reducer,initialState);
  const {tableData} = state;

  return(
    <TableContextApi.Provider value={()=>{return tableData,dispatch}}>
      <Form/>
      <Table/>
    </TableContextApi.Provider>
  )
}

export default App;
