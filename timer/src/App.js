import './App.css';
import React, { useEffect, useRef, useState } from "react";
function App() {
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timreRef = useRef(null);

    useEffect(() => {
        setIsRunning(true);
    }, []);

    useEffect(() => {
        if (isRunning) {
            timreRef.current = setInterval(() => {
                setCount((prevCount) => {
                    return prevCount + 1;
                });
            }, 1000);
        } else {
            clearInterval(timreRef.current);
        }
        return () => clearInterval(timreRef.current);
    }, [isRunning]);

    return (
        <div className="App">
            <header className="App-header">
            <h1>Timer: {count}</h1>
            </header>
        </div>
    );
}

export default App;
