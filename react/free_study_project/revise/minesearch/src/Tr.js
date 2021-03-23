import React, { useState,useContext } from 'react';
import {TableContextApi} from './App';
import Td from './Td';

const Tr = ({trIndex}) =>{
    const {dispatch,tableData} = useContext(TableContextApi);
    return(
        <tr>
            { Array(tableData[0].length).fill().map((td,i)=><Td trIndex={trIndex} tdIndex={i}/>) }
        </tr>
    )
}

export default Tr;