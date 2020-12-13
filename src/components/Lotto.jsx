import React ,{ useRef, useState , useEffect , useMemo, useCallback}from 'react'
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
    //없으면 getWinnumbers()함수가 계속 실행됨  useMemo로 이것을 잠시 기억해 둘 수가 있음 
    //두번째인자[] 가 바뀌지 않는한 다시 실행되지 않음
    //[]안에 WinBalls를 넣어주면 useEffect에서 계속 state가 바뀌어서 함수를 계속 실행해줌 
    const lottoNumbers = useMemo( () => getWinNumbers() , []);
    const [WinNumbers, setWinNumbers] = useState(lottoNumbers);
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
    },[timeouts.current]);   //빈 배열이면 componentDidMount하고 동일
                    //배열에 요소가 있으면 componentDidmount,ComponentDidUpdate 둘 다 수행
                    // 배열에 winNumber.length===0 을 넣어주면 처음에 두번 실행됨
                    //timeouts.current =[] 이럴 때는 바뀌는것 
                    //timeouts.current[i] = setTimeout이럴때는 요소에 넣어줘서 바뀌는 것이 아님

                    //useMemo는 값을 기억
                    //useCallback은 함수 자체를 기억
                    //[]에 값을 넣어주지 않으면 계속 바뀌지가 않음 => []에 바꾸어야 하는 값을 넣어준다.
                    //useCallback에 state값을 넣어줄 때 조심...
                    //자식에게 넘길 때는 useCallback을 꼭 해줘야 한다.
    const onClickRedo = useCallback(() => {
        console.log('onclickRedo');
        console.log(WinNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [WinNumbers]);

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

//componentDidMount 만 하고 싶다.
// useEffect(() => {
//     //ajax
// }, [])

//componentDidUpdate만 , componentDidMount X
// const mounted = useRef(false);
// useEffect(() => {
//     if(!mounted.current){
//         mounted.current=true;
//     }else{
//         //ajax
//     }
// },[바뀌는 값])  
