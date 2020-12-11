import React,{useRef, useState} from 'react'

const WordRelay = () => {
    const [word, setWord] = useState("몰라")
    const [value, setValue] = useState("")
    const [result, setResult] = useState("")
    const inputRef = useRef(null)
    
    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(word[word.length-1] === value[0]){
            setResult('정답');
            setWord(value);
            setValue("");
            inputRef.current.focus()
        }else{
            setResult('땡');
            setValue('')
            inputRef.current.focus()
        }
    };

    return (
        <div>
            <div>{word}</div>

            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} value = {value} onChange={onChangeInput}/>
                <button>입력</button>
            </form>
            <div id="result">
                {result}
            </div>

        </div>
        
    )
}

export default WordRelay;