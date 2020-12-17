import React,{useReducer, createContext , useMemo} from 'react';
import Table from './Table';
import Form from './Form';
import './MineSearch.css'

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0 
}

export const TableContext = createContext({
    tableData:[],
    dispatch: () => {},
    
});

const initialState = {
    tableData:[],
    timer:0,
    result:'',
}

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map( (arr,i) => {
        return i;
    });
    const shuffle = [];
    while( candidate.length > row* cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i<row; i++){
        const rowData= [];
        data.push(rowData)
        for(let j=0; j<cell; j++){
            rowData.push(CODE.NORMAL);
        }
    }

    //지뢰 심기
    for(let k = 0; k< shuffle.length; k++){
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    console.log(data);
    return data;
}

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
    switch(action.type){
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.Row, action.Cell, action.Mine)
            }
        default:
            return state;
    }
}
function MineSearch() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {tableData, timer, result} = state

    //contextAPI 할때 최적화
    const value = useMemo( () => ({tableData: tableData , dispatch}), [tableData])

    return (
        // <TableContext.Provider value={ { tableData: tableData, dispatch} }> 이렇게 하면 최적화 하기 어려움
        <TableContext.Provider value={value}>   
            <Form />    
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    )
}

export default MineSearch
