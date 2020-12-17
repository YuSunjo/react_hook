import React,{useState, useCallback ,useContext} from 'react'
import { TableContext, START_GAME } from './MineSearch'

const Form = () => {
    const [Row, setRow] = useState(10)
    const [Cell, setCell] = useState(10)
    const [Mine, setMine] = useState(20)
    const {dispatch} = useContext(TableContext);

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value)
    },[]);
    const onChangeCell = useCallback((e) => {
        setCell(e.target.value)
    },[]);
    const onChangeMine = useCallback((e) => {
        setMine(e.target.value)
    },[]);

    const onClickBtn = useCallback(() => {
        dispatch({type: START_GAME, Row, Cell, Mine})
    },[Row, Cell, Mine])

    return (
        <div>
            <input type="number" placeholder="세로" value={Row} onChange={onChangeRow} />
            <input type="number" placeholder="가로" value={Cell} onChange={onChangeCell} />
            <input type="number" placeholder="지뢰" value={Mine} onChange={onChangeMine} />
            <button onClick={onClickBtn}>시작</button>
        </div>
    )
}

export default Form
