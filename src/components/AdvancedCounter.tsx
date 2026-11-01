import React, { useState } from 'react'

export const AdvancedCounter:React.FC = () =>{
    const[count,setCount] = useState<number>(0);

    const[step,setStep]=useState<number>(1);

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
            <div>
                <label htmlFor='step-input'>Step Value: </label>
                <input
                    id='step-input'
                    type='number'
                    min={1}
                    value={step}
                    onChange={(e) =>setStep(Math.max(1,Number(e.target.value)||1))}
                
                />
            </div>
        </div>
    )
}
export default AdvancedCounter;