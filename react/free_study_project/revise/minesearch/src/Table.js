import React, { useState,useContext } from 'react';
import TableContextApi from './App'
import Tr from './Tr'

const Table = () =>{
    //const {dispatch} = useContext(TableContextApi);

    return(
        <table>
            <Tr/>
        </table>
    )
}

export default Table;