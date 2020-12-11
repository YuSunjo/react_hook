import React from 'react';

const Try = ({tryInfo}) => {
    return (
        <div>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </div>
    )
}

export default Try;