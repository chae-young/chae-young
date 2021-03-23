import React, { useState,useContext } from 'react';
import {TableContextApi} from './App';
import Tr from './Tr'

const Table = () =>{
    const {dispatch,tableData} = useContext(TableContextApi);

    return(
        <table>
            { Array(tableData.length).fill().map((tr,i)=><Tr trIndex={i}/>) }
        </table>
    )
}

export default Table;