import React,{useContext,useCallback} from 'react';
import { TableContext } from './useReducerPractice'
//type 이름 
import { START_GAME } from './useReducerPractice'


const useReducerChild= () => {
    //state 들을 useState로 선언
    //value를 TableContext에서 가져온다. 
    //const {dispatch} = useContext(TableContext)  로 구조분해 할 수 있다. 

    //example     이제 dispatch를 쓸 수 있다. 
    // const onClickBtn = useCallback(() => {
    //     dispatchEvent({ type: })
    // } ,[])

    const value = useContext(TableContext);
    return (
        <div>
            
        </div>
    )
}

export default useReducerChild
