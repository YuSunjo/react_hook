import React , {useState, useRef, useEffect } from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
  };
  
  const scores = {
    가위: 1,
    바위: 0,
    보: -1,
  };
  
  const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find((v) => {
        return v[1] === imgCoord;
    })[0]
  }

const RSP =() => {
    const [result , setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score , setScore] = useState(0);
    const interval = useRef();


    //

    useEffect(() => {        //componentDidMount, componentDidUpdate 
        console.log('he')
        interval.current = setInterval(changeHand, 100);
        return () => {       //componentWIllUnmount 역할 
            clearInterval(interval.current);
        }
        
    }, [imgCoord]);        //배열 안의 있는 것이 바뀔 때마다 계속 실행됨 

    const changeHand = () => {
        if(imgCoord ===rspCoords.바위){
            setImgCoord(rspCoords.가위);
        }else if(imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.보)
        }else if(imgCoord === rspCoords.보){
            setImgCoord(rspCoords.바위)
        }
    };

    const onClickBtn = (choice) => () => { 
        if(interval.current) {
            clearInterval(interval.current);
            interval.current = null;
            const myScore = scores[choice];
            const cpuScore = scores[computerChoice(imgCoord)];
            const diff = myScore - cpuScore
            if (diff === 0) {
                setResult('비겼습니다!');
              } else if ([-1, 2].includes(diff)) {
                setResult('이겼습니다!');
                setScore((prevScore) => prevScore + 1);
              } else {
                setResult('졌습니다!');
                setScore((prevScore) => prevScore - 1);
              }
              setTimeout(() => {
                interval.current = setInterval(changeHand, 100);
              }, 1000);
        }
        
    };

    return (
        <div>
            <div id="computer" style={ {background: `url(https://www.google.com/url?sa=i&url=http%3A%2F%2Fblog.naver.com%2FPostView.nhn%3FblogId%3Ddolbirds88%26logNo%3D220731724387%26parentCategoryNo%3D%26categoryNo%3D14%26viewDate%3D%26isShowPopularPosts%3Dtrue%26from%3Dsearch&psig=AOvVaw2syQ3nrrulX_pjiZ01-cOp&ust=1607837437711000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiW2Kzbx-0CFQAAAAAdAAAAABAD) ${imgCoord} 0`} }></div>
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>{score}점</div>
        </div>
    )
}

export default RSP ;