import './App.css';
import React, { useEffect, useRef, useState } from "react";
function App() {
    // let count = 59;
    const [count, setCount] = useState(0);
    const [click, setClick] = useState(0);
    // let tempCount = 0;
    const timreRef = useRef(null);

    function runTimer() {
        timreRef.current = setInterval(() => {

            setCount((prevCount) => {
                return prevCount + 1;
            });
        }, 1000);
    };

    useEffect(() => {
        runTimer();
    }, []);

    function handleClick() {
        runTimer();
    }

    return (
        <div className="App">
            <header className="App-header">
            <h1>Timer: {count}</h1>
            <button onClick={handleClick}>Click me:</button>
            </header>
        </div>
    );
}

export default App;
