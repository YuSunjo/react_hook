import React, {useCallback, useRef, useEffect} from 'react'

function optimize_performance() {
    console.log('rendered');
    const ref = useRef([]);
    useEffect( () => {
        console.log(상태 === ref.current[0]) // 이런식으로 상태들을 하나씩 비교해가면서 왜 렌더링이 일어나는지 확인
        ref.current = [상태들]
    }, [상태들])
    return (
        <div>
            
        </div>
    )
}

export default optimize_performance

