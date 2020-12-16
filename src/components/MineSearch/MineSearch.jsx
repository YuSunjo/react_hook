import React,{useReducer, createContext} from 'react';
import Table from './Table';
import Form from './Form';

const TableContext = createContext({
    
});

const initialState = {
    tableData:[],
    timer:0,
    result:'',
}

const reducer = (state, action) => {
    switch(action.type){

        default:
            return state;
    }
}
function MineSearch() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {tableData, timer, result} = state

    return (
        <TableContext.Provider value={{ tableData: tableData, dispatch}}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    )
}

export default MineSearch
