import React,{useRef, useState} from 'react'

const Gugudan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);
    //useRef 로 dom에 접근 current 붙여주기 

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(parseInt(value) === first* second){
            //setRusult((preventResult)=> {
            //     return ...
            // })    --> 예전의 state를 담고 있을 때 안에 함수 사용 가능
            setResult('정답:' +value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            inputRef.current.focus();
        }else{
            setResult('떙');
            setValue('');
            inputRef.current.focus();
        }
    };

    return (
        <div>
            <div>{first} 곱하기 {second} 는?\</div>

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

export default Gugudan;