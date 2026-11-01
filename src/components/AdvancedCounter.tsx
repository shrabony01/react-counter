import React, { useState ,useEffect} from 'react'

export const AdvancedCounter:React.FC = () =>{
    const[count,setCount] = useState<number>(0);

    const[step,setStep]=useState<number>(1);

    const[history,setHistory]=useState<number[]>([0]);

    //ading the sacestatus state here
    const [saveStatus,setSaveStatus]=useState<string>('Changes saved.');

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
        setHistory([0]);
    }
    //autosave useeffect 
    useEffect(()=>{
        setSaveStatus('Saving changes...');

        const timer = setTimeout(() => {

            try{
                localStorage.setItem('advanced_counter_value',JSON.stringify(count));
                localStorage.setItem('advanced_counter_history',JSON.stringify(history));
                setSaveStatus('Changes saved.');

            }catch(err){
                setSaveStatus('Failed to save.');
            }

        },400)
        //cleanup function:cancel the pending save if histry updates quickly

        return() => {
            clearTimeout(timer);
        };
    },[count,history]);

    // keyboard lister useeefect
    useEffect(()=>{
        const handleKeyDown = (event:KeyboardEvent) =>{
            //dont triiger arrow if user is typing inside the step input
            if(
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement
            ){
                return;
            }
            if(event.key==='ArrowUp'){
                event.preventDefault();
                handleIncrement();
            }else if (event.key==='ArrowDown'){
                event.preventDefault();
                handleDecrement();
            }
        };
        window.addEventListener('keydown',handleKeyDown);

        // Cleanup: removes the listener when unmounting
        return()=>{
            window.removeEventListener('keydown',handleKeyDown);
        };

    },[step]);

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
            {/* display savestatus */}
            <p>{saveStatus}</p>
            <div>
                <div>Count History:</div>
                <div>{history.join(', ')}</div>
            </div>
            <p>Use ArrowUp to increment and ArrowDown to decrement.</p>
        </div>
    )
}
export default AdvancedCounter;