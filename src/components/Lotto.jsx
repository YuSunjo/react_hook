import React ,{ useRef, useState , useEffect }from 'react'
import LottoBall from './LottoBall'

function getWinNumbers() {
    console.log('getWinNumbers')
    const candidate = Array(45).fill().map((v,i) => i+1);
    const shuffle = [];
    while(candidate.length>0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length -1];
    const winNumbers= shuffle.slice(0,6).sort((p,c) => p-c);
    return [...winNumbers,bonusNumber];
}

const Lotto=() =>{

    const [WinNumbers, setWinNumbers] = useState(getWinNumbers());
    const [WinBalls, setWinBalls] = useState([]);
    const [Bonus, setBonus] = useState(null);
    const [Redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect( () => {
        for(let i =0; i<WinNumbers.length -1; i++){
            timeouts.current[i] = setTimeout( () => {
                setWinBalls( (prevBalls) => {
                    return [...prevBalls, WinNumbers[i]];
                })
            }, (i+1)* 1000);
        }
        timeouts.current[6] = setTimeout( () => {
            setBonus(WinNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeouts.current.forEach( (v) => {
                clearInterval(v);
            })
        }
    },[timeouts.current])   //빈 배열이면 componentDidMount하고 동일
                    //배열에 요소가 있으면 componentDidmount,ComponentDidUpdate 둘 다 수행
                    // 배열에 winNumber.length===0 을 넣어주면 처음에 두번 실행됨
                    //timeouts.current =[] 이럴 때는 바뀌는것 
                    //timeouts.current[i] = setTimeout이럴때는 요소에 넣어줘서 바뀌는 것이 아님

    const onClickRedo = () => {
        console.log('onclickRedo')
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }

    return (
        <div>
            <div>당첨숫자</div>
            <div id="결과창">
                {WinBalls.map( (v) => <LottoBall key={v} number={v}/>)}
            </div>
            <div>보너스</div>
            {Bonus && <LottoBall number={Bonus} onClick={onClickRedo} />}
            {Redo && <button onClick={onClickRedo}>한번더</button>}
        </div>
    )
}

export default Lotto
