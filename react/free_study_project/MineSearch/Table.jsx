import React, { useContext,memo } from 'react';
import { TableContext } from './MineSearch';
import Tr from './Tr';

const Table = memo(() =>{
    const {tableData,dispatch} = useContext(TableContext) //value.tableData

    return(
        <table>
            {Array(tableData.length).fill().map((tr,i) => <Tr rowIndex={i}/>)}
            
        </table>
    )
})

export default Table;