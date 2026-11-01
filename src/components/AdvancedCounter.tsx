import React, { useState } from 'react'

export const AdvancedCounter:React.FC = () =>{
    const[count,setCount] = useState<number>(0);

    const[step,setStep]=useState<number>(1);

    const[history,setHistory]=useState<number[]>([0]);

    const handleIncrement = () => {
        setCount((prev)=>prev+1);

        const next = prev +step;
        setHistory((hist) => [...hist,next]);
        return next;
    }

    const handleDecrement = () => {
        setCount((prev) => prev-1);

        const next= prev - step;
        setHistory((hist) => [...hist,next]);
        return next;
    }

    const handleReset = () =>{
        setCount(0);
        setHistory([0];)
    }
    return(
        <div>
            <span>Cointer</span>
            <h2>Current Count: {count}</h2>
            <div>
                <button type='button' onClick={handleDecrement}>Decrement</button>
                <button type='button' onClick={handleIncrement}>Increment</button>
                <button type='button' onClick={handleReset}>Reset</button>
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
            <div>
                <div>Count History:</div>
                <div>{history.join(', ')}</div>
            </div>
        </div>
    )
}
export default AdvancedCounter;