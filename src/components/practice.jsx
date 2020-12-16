import React,{useRef, useState, useEffect, useCallback, useMemo} from 'react'
import LottoBall from './LottoBall'

const getWinNumbers = () => {
    const candidate = Array(45).fill().map((v, i) => i+1)
    const shuffle = [];
    while(candidate.length>0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length -1];
    const winNumbers = shuffle.slice(0,6).sort((p,c) => p-c)
    console.log(winNumbers);
    return [...winNumbers, bonusNumber]
}

const Practice = () => {
    const lottoNumbers = useMemo( () => getWinNumbers(),[]);
    const [WinNumbers, setWinNumbers] = useState(lottoNumbers);
    const [WinBalls, setWinBalls] = useState([]);
    const [BonusBall, setBonusBall] = useState(null);
    const [Redo, setRedo] = useState(false);
    const timeout = useRef([])

    useEffect(() => {
        for(let i=0; i<WinNumbers.length-1; i++){
            timeout.current[i] = setTimeout( () => {
                setWinBalls( (prevState) => {
                    return [...prevState, WinNumbers[i]];
                })
            }, (i+1)*1000)
        }
        timeout.current[6] = setTimeout( () => {
            setBonusBall(WinNumbers[6]);
            setRedo(!Redo)
        }, 7000)
        return () => {
            timeout.current.forEach(v => {
                clearInterval(v);
            })
        }
    }, [timeout.current])



    const onClickRedo =useCallback(() => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonusBall([null]);
        setRedo(false);
        timeout.current = [];  
    },[WinNumbers])

    return (
        <div>
            <div>당첨숫자</div>
            <div id="결과창">
                {WinBalls.map((v) => {
                    return <LottoBall key={v} number={v}/>
                })}
            </div>
            <div>보너스공</div>
            {BonusBall && <LottoBall number={BonusBall} />}
            {Redo && <button onClick={onClickRedo}>한번더</button>}
        </div>
    )
}

export default Practice;