import React ,{ useCallback, useEffect, useRef, memo}from 'react'
import {CLICK_CELL,CHANGE_TURN} from './TTT'

const Td= memo(({cellIndex, rowIndex, dispatch, cellData}) => {
    console.log('td rendered')
    //
    // const ref = useRef([]);
    // useEffect(() => {
    //     // console.log(rowIndex=== ref.current[0],cellIndex=== ref.current[1],dispatch=== ref.current[2],cellData=== ref.current[3])
    //     console.log(cellData, ref.current[3])
    //     ref.current = [rowIndex, cellIndex, dispatch, cellData];
    // }, [rowIndex, cellIndex, dispatch, cellData])
    //여기까지 최적화 코드 --> 어떤 값이 바뀌는지 보기 위해서

    const onClickTd = useCallback( () => {
        console.log(rowIndex, cellIndex);
        if(cellData){
            return ;
        }
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
        
    } , [cellData])

    return (
            <td onClick={onClickTd}>{cellData}</td>
    )
});

export default Td
