import React, { useState } from 'react'

export const AdvancedCounter:React.FC = () =>{
    const[count,setCount] = useState<number>(0);

    const handleIncrement = () => {
        setCount((prev)=>prev+1);
    }

    const handleDecrement = () => {
        setCount((prev) => prev-1);
    }
    return(
        <div>
            <span>Cointer</span>
            <h2>Current Count: {count}</h2>
            <div>
                <button type='button' onClick={handleDecrement}>Decrement</button>
                <button type='button' onClick={handleIncrement}>Increment</button>
            </div>
        </div>
    )
}
export default AdvancedCounter;