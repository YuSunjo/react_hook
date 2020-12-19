//useReducer의 전체적인 틀 
import React, {useReducer, createContext, useMemo} from 'react';
import useReducerChild from './useReducerChild'

//type example
export const START_GAME = 'START_GAME'

export const TableContext = createContext({

});

const initialState = {

};

const reducer = (state, action ) => {
    switch(action.type){
        default:
            return state;
    }
};

const useReducerPractice= () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    //dispatch와 그 외 state들 [] 값이 바뀔 state
    const value = useMemo(() => ({ dispatch }) , [] )
    return (
        //Provider로 묶어줘야지 그 안에 있는 컴포넌트들에 contextAPI를 사용 할 수 있다. 
        //value에 자식 컴포넌트에 전달 해 줄 state와 dispatch
        //성능 최적화를 위해 useMemo로 감싸준다. 
        <TableContext.Provider value = {{ value  }}>
            <useReducerChild />
        </TableContext.Provider>
    )
}

export default useReducerPractice
