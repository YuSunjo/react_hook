import React ,{ useCallback}from 'react'
import {CLICK_CELL,CHANGE_TURN} from './TTT'

const Td= ({cellIndex, rowIndex, dispatch, cellData}) => {

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
}

export default Td
