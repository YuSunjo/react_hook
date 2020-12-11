import React , { useState , useRef} from 'react';
import Try from './BaseballTryinfo';


function getNumbers() {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i =0; i<4; i++){
        const chosen = candidate.splice(Math.floor(Math.random() * (9-i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const Baseball = () => {
    const [value, setValue] = useState("");     //
    const [result, setResult] = useState("");   //정답
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const inputCursor = useRef(null);

    
    
    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')){
            setResult('홈런');
            setTries((prevTries) => {
                return [...prevTries, {try: value , result: '홈런'}]
            })
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputCursor.current.focus()
        }else{
            const answerArray = value.split('').map( (v) => { return parseInt(v)})
            let strike = 0;
            let ball = 0;
            if(tries.Length >= 9){
                setResult(`10번 넘게 틀려서 다시 시작합니다. 답은 ${answer.join('')}`);
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                inputCursor.current.focus()

            }else{
                for(let i=0; i<4; i++){
                    if(answerArray[i] === answer[i]){
                        strike+=1;
                    }else if (answer.includes(answerArray[i])){
                        ball +=1;
                    }
                }
                setTries((prevTries) => 
                   [ ...prevTries, {try: value, result: `${strike}스트라이크 ${ball}볼`}]
                )
                setValue('');
                inputCursor.current.focus();
            }
        }
    };
    return (
        <div>
            <div>{result}</div>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput} ref={inputCursor}/>
                <button>입력</button>
            </form>
            <div>시도 : {} </div>
            <ul>
                {tries.map( (v,i) => {
                    return (
                        <Try key={`${i+1}차 시도:`} tryInfo={v}/>
                    )
                })}
            </ul>
        </div>
    )
}

export default Baseball