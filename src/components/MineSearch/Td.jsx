import React,{useContext} from 'react'
import {TableContext} from './MineSearch'

const getTdStyle = (code) => {

}

const getTdText = (code) => {

}

function Td({rowIndex, cellIndex}) {
    const {tableData} = useContext(TableContext)

    return (
        <td>{tableData[rowIndex][cellIndex]}</td>
    );
};

export default Td
