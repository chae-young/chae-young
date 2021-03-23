import React, { useState,useContext } from 'react';
import {TableContextApi,CODE,OPEN_CELL} from './App';

const Td = ({trIndex,tdIndex}) =>{
    const {dispatch,tableData} = useContext(TableContextApi);

    const getTdText = (text) =>{
   
        switch(text){
            case CODE.NORMAL:
                return '';
            case CODE.MINE:
                return 'x';
        }
    }
    const onClickTd = () =>{
        switch(tableData[trIndex][tdIndex]){
            case CODE.NORMAL:
                dispatch({type:OPEN_CELL})
        }
    }

    return(
        <td onClick={onClickTd}>{getTdText(tableData[trIndex][tdIndex])}</td>
    )
}

export default Td;