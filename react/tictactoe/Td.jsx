import React,{memo,useCallback,useEffect,useRef} from 'react';
import {CLICK_CELL,SET_TURN} from './TicTacToe';//액션 불러오기

const Td = memo(({rowIndex,cellIndex,dispatch,cellData}) =>{

    /*성능확인할때 뭐가 잘못됬는지 확인..false면 다르다!
    const ref = useRef([]);
    useEffect(()=>{
        console.log(rowIndex===ref.current[0],cellIndex===ref.current[1],dispatch===ref.current[2],cellData===ref.current[3]);
        console.log()
        ref.current = [rowIndex,cellIndex,dispatch,cellData]
    },[rowIndex,cellIndex,dispatch,cellData])
*/
    const onClickTd = useCallback(() =>{
        console.log(rowIndex,cellIndex);
        if(cellData){//바뀌면?!
            return
        }
        dispatch({type:CLICK_CELL,row:rowIndex,cell:cellIndex})

    },[cellData])

    return(
        <>
            <td onClick={onClickTd}>{cellData}</td>
        </>
    )
})

export default Td;