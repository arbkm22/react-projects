import './App.css';
import { useState } from 'react';

function App() {

    const [inputValue, setInputValue] = useState("");
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setCity(inputValue);
        console.log('inputValue: ', inputValue);
        setInputValue('');
    }

    return (
        <div className="App">
            <form 
                onSubmit={handleSubmit}
                className="input">
                <input
                    name="item"
                    placeholder="Enter a city..."
                    className="input-box"
                    value={inputValue}
                    autoComplete="off"
                    onChange={(e) => setInputValue(e.target.value)} />
            </form>
            <div className="weather">
                <p>Weather App</p>
                <div className="main">
                    <div className="display">
                        {city}
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default App;
