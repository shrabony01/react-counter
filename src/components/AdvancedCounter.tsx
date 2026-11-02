import React, { useState ,useEffect} from 'react'

export const AdvancedCounter:React.FC = () =>{
    const[count,setCount] = useState<number>(0);

    const[step,setStep]=useState<number>(1);

    const[history,setHistory]=useState<number[]>([0]);

    //ading the sacestatus state here
    const [saveStatus,setSaveStatus]=useState<string>('Changes saved.');

    const handleIncrement = () => {
    const next = count + step;
    setCount(next);
    setHistory((prev) => [...prev, next]);
  };

  const handleDecrement = () => {
    const next = count - step;
    setCount(next);
    setHistory((prev) => [...prev, next]);
  };

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
            } else if (event.key==='ArrowDown'){
                event.preventDefault();
                handleDecrement();
            }
        };
        window.addEventListener('keydown',handleKeyDown);

        // Cleanup: removes the listener when unmounting
        return()=>{
            window.removeEventListener('keydown',handleKeyDown);
        };

    },[count,step]);

    return(
        <div style={styles.card}>
            <span style={styles.headerTitle}>Counter</span>
            <h2 style={styles.counterText}>
                Current Count: <span style={styles.boldNumber}>{count}</span>
             </h2>
            <div style={styles.buttonRow}>
                <button type='button' onClick={handleDecrement} style={styles.neutralButton}>
                    Decrement
                </button>
                <button type='button' onClick={handleIncrement} style={styles.neutralButton}>
                    Increment
                </button>
                <button type='button' onClick={handleReset} style={styles.resetButton}>
                    Reset
                </button>
            </div>
            <div style={styles.stepContainer}>
                <label htmlFor='step-input' style={styles.stepLabel}>
                    Step Value: 
                </label>
                <input
                    id='step-input'
                    type='number'
                    min={1}
                    value={step}
                    onChange={(e) =>setStep(Math.max(1,Number(e.target.value)||1))}
                    style={styles.stepInput}
                />
            </div>
            {/* display savestatus */}
            <p style={styles.saveStatus}>{saveStatus}</p>
            <div style={styles.historySection}>
                <div style={styles.historyLabel}>Count History:</div>
                <div style={styles.historyValues}>{history.join(', ')}</div>
            </div>
            <p style={styles.footerHint}>
                Use ArrowUp to increment and ArrowDown to decrement.
            </p>
        </div>
    )
}
export default AdvancedCounter;

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    maxWidth: '460px',
    margin: '3rem auto',
    padding: '2rem 1.5rem 1.5rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#334155',
  },
  headerTitle: {
    fontSize: '0.95rem',
    color: '#64748b',
    fontWeight: 500,
  },
  counterText: {
    fontSize: '1.9rem',
    fontWeight: 500,
    margin: '1.25rem 0',
    color: '#1e293b',
  },
  boldNumber: {
    fontWeight: 700,
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  neutralButton: {
    padding: '0.55rem 1rem',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    color: '#334155',
    fontWeight: 500,
  },
  resetButton: {
    padding: '0.55rem 1.2rem',
    backgroundColor: '#ef4444',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    color: '#ffffff',
    fontWeight: 500,
  },
  stepContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    fontSize: '0.95rem',
  },
  stepLabel: {
    color: '#475569',
  },
  stepInput: {
    width: '55px',
    padding: '0.25rem 0.4rem',
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    textAlign: 'center',
    fontSize: '0.95rem',
  },
  saveStatus: {
    fontStyle: 'italic',
    fontSize: '0.85rem',
    color: '#64748b',
    margin: '0.75rem 0 1.25rem',
  },
  historySection: {
    borderTop: '1px solid #e2e8f0',
    paddingTop: '1rem',
    textAlign: 'left',
    fontSize: '0.875rem',
  },
  historyLabel: {
    color: '#475569',
    marginBottom: '0.5rem',
  },
  historyValues: {
    color: '#0f172a',
    wordBreak: 'break-word',
  },
  footerHint: {
    marginTop: '1.5rem',
    fontSize: '0.75rem',
    color: '#94a3b8',
  },
};