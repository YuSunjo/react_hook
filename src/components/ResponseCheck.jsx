import React, {useState, useRef} from 'react';


const ResponseCheck = () => {
    const [state, setstate] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();
    //ref and state different => if change value =>  rendering 

    const onClickScreen = () => {
        if(state === 'waiting'){
            setstate('ready');
            setMessage('초록색이 되면 클릭하세요');
            timeout.current = setTimeout( () => {
                setstate('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        }else if(state ==='ready') {
            clearTimeout(timeout.current);
            setstate('waiting');
            setMessage('너무 성급하시군요.. 초록색이 된 후에 클릭하세요');
        }else if(state === 'now'){
            endTime.current = new Date();
            setstate('waiting');
            setMessage('클릭해서 시작하세요');
            setResult( (prevResult) => {
                return [...prevResult, endTime.current- startTime.current];
            })
        }

    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return (result.length ===0 
            ? null 
            : 
            <div>
                <div>평균시간: {result.reduce( (a,c) => a+c) / result.length}ms</div>
                <button onClick={onReset}>reset</button>

            </div>)
    }

    return (
        <div>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}


        </div>
    )
}

export default ResponseCheck;