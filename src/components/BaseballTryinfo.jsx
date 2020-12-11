//require => 노드에서의 모듈     module.exports
//import  =>                    export default


import React,{memo} from 'react';
// const {memo } = React;
//memo -- state나 props가 바뀌었을 때만 랜더링 됨 --> 성능 최적화 !!

const Try = memo(( {tryInfo} ) => {
    return (
        <div>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </div>
    )
});

export default Try;