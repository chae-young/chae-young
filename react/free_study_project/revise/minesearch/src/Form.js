import React, { useState,useContext } from 'react';
import { START_GAME } from './App';
import {TableContextApi} from './App';

const Form = () =>{
    const [row,setRow] = useState();
    const [cell,setCell] = useState();
    const [mine,setMine] = useState();
    //const {dispatch} = useContext(TableContextApi);
    console.log(TableContextApi)
    const onChangeRow = ({target}) =>{setRow(target.value);}
    const onChangeCell = ({target}) =>{setCell(target.value);}
    const onChangeMine = ({target}) =>{setMine(target.value);}

    const onClickBtn = () =>{
        //dispatch({type:START_GAME,row,cell,mine})
    }

    return(
        <div>
            <input type="number" value={row} name="row" onChange={onChangeRow}/>
            <input type="number" value={cell} name="cell" onChange={onChangeCell}/>
            <input type="number" value={mine} name="mine" onChange={onChangeMine}/>
            <button onClick={onClickBtn}>시작</button>
        </div>
    )
}

export default Form;