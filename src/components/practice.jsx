import React,{useRef, useState} from 'react'


getNumber =() => {
    const candidate= [1,2,3,4,5,6,7,8,9];
    const array =[];
    
    for(let i =0; i<4; i++){
        const chosen = candidate.splice(Math.floor(Math.random() * 9-i),1)[0]
        array.push(chosen);

        return array
    }
}

const Baseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = usestate(getNumber());
    const [tries, setTries] = useState([]);

    const inputRef = useRef(null);
    
    const onSubmitForm = (e) => {
        e.preventDefault()
        if(value === answer.join('')){
            setResult('정답입니다.');
            setTries( (prevTries) => {
                return [...prevTries, {try: value, result: '정답'}]
            })
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnswer(Math.ceil(Math.random() * 9));
            setTries([]);
            inputRef.current.focus();
        }else{
            const answerArray = value.split('').map((v) => {
                return parseInt(v);
            })
            let strike = 0;
            let ball =0;
            if(tries.length >=9){
                setResult(`10번 넘게 틀려서 다시 시작합니다. 답은 ${answer.join('')}`);
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                inputCursor.current.focus()
            }else {
                for(let i =0; i<4; i++){
                    if(answerArray[i] === answer[i]){
                        strike +=1;
                    }else if(answer.includes(answerArray[i])){
                        ball +=1;
                    }
                }
                setTries((prevTries) => {
                    return [...prevTries, {try: value, result: `${strike} 스트라이크 ${ball}볼`}];
                })
            }
        }
    }

    const onChangeInput = (e) => {
        setValue(e.target.value)
    }
    return (
        <div>
            <div>정답{result}</div>
            <form onSubmit={}>
                <input onChange={onChangeInput} value={value} ref={inputRef}/>
                <button onClick={}>입력</button>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map( (v,i) => {
                    <Try key={i+1} tryInfo={v}/>
                })}
            </ul>
            
        </div>
    )
}

export default Baseball;