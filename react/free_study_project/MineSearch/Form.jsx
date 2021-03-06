import React,{useCallback, useState,useContext,memo} from 'react';
import {TableContext,START_GAME} from './MineSearch'

const Form = memo(() =>{
    const [row,setRow] = useState(10);
    const [cell,setCell] = useState(10);
    const [mine,setMine] = useState(20);
    const {dispatch} = useContext(TableContext);//api 가져오기

    const onChangeRow = useCallback((e)=>{
        setRow(e.target.value);
    },[])
    const onChangeCell = useCallback((e)=>{
        setCell(e.target.value);
    },[])
    const onChangeMine = useCallback((e)=>{
        setMine(e.target.value);
    },[])

    const onClickBtn = useCallback((e)=>{
        dispatch({type:START_GAME,row,cell,mine})
    },[row,cell,mine])

    return(
        <div>
            <input type="number" value={row} onChange={onChangeRow}/>
            <input type="number" value={cell} onChange={onChangeCell}/>
            <input type="number" value={mine} onChange={onChangeMine}/>
            <button onClick={onClickBtn}>시작</button>
        </div>
    )
})

export default Form;