import React,{useMemo,memo} from 'react';
import Td from './Td';

const Tr = memo(({rowData,rowIndex,dispatch}) =>{
    return(
        <tr>
            {Array(rowData.length).fill().map( (td,i) => 
                //컴포넌트기억해줌. rowdata가 바뀌었을때만 렌더링
               // useMemo(()=><Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}/>,[rowData[i]])
               <Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}/>
            )}
        </tr>
    )
})

export default Tr;