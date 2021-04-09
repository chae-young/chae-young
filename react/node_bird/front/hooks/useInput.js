import {useState,useCallback} from 'react';

//커스텀훅
export default (initialValue=null)=>{
    const [value,setValue] = useState(initialValue);
    const handeler = useCallback((e)=>{
        setValue(e.target.value)
    },[])    

    return [value,handeler]
}