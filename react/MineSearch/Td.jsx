import React,{useCallback, useContext} from 'react';
import { TableContext,CODE, OPEN_CELL,CLICK_MINE,FLAG_CELL,QUESTION_CELL,NORMALIZE_CELL } from './MineSearch';

const Td = ( {rowIndex,cellIndex} ) =>{
    const {tableData,disapath,halted} = useContext(TableContext);


    const getTdStyle = (code) =>{
        switch(code){
            case CODE.NORMAL:
            case CODE.MINE:
                return{
                    background:'#777'
                }
            case CODE.CLICKED_MINE:
            case CODE.OPENED:
                return{
                    background:'white'
                } 
            case CODE.QUESTION:  
            case CODE.QUESTION_MINE:
                return{
                    background:'yellow'
                }  
            case CODE.FLAG:  
            case CODE.FLAG_MINE:
                return{
                    background:'red'
                }                  
            default:
                return{
                    background:'white'
                }
        }
    }

    const getTdText = (code) =>{
        switch(code){
            case CODE.NORMAL:
                return '';
            case CODE.MINE:
                return 'X';
            case CODE.CLICKED_MINE:
                return '팡';
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                return '!';
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return '?';
            default:
                return '';
        }
    }

    const onClickTd = useCallback(() =>{
        if(halted){//게임끝났으면 리턴
            return
        }
        switch(tableData[rowIndex][cellIndex]){
            case CODE.OPEND:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return
            case CODE.NORMAL:
                disapath({type:OPEN_CELL,row:rowIndex,cell:cellIndex})
                return
            case CODE.MINE:
                disapath({type:CLICK_MINE,row:rowIndex,cell:cellIndex})
                return
            default:
                return
        }
    },[tableData[rowIndex][cellIndex],halted])

    const onRightClickTd = useCallback((e) =>{
        e.preventDefault();
        if(halted){//게임끝났으면 리턴
            return
        }
        switch(tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                disapath({type:FLAG_CELL,row:rowIndex,cell:cellIndex})
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                disapath({type:QUESTION_CELL,row:rowIndex,cell:cellIndex})
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                disapath({type:NORMALIZE_CELL,row:rowIndex,cell:cellIndex})    
                return;            
            default:
                return
        }

    },[tableData[rowIndex][cellIndex],halted])

    return(
        <td onClick={onClickTd} onContextMenu={onRightClickTd} style={getTdStyle(tableData[rowIndex][cellIndex])}>{getTdText(tableData[rowIndex][cellIndex])}</td>
    )
}

export default Td;