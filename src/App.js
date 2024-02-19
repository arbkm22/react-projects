import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

    const handleSubmit = (e) => {
        e.preventDefaults();
    }

    const handleChange = (e) => {
        let inputValue = e.target.value;
        console.log('inputVal: ', inputValue)
    }

    return (
        <div className="App">
            <div className="todo">
                <p className="heading">To Do List</p>
                <form onSubmit={handleSubmit}>
                    <input
                        name="item"
                        placeholder="Add New"
                        className="input-box" 
                        onChange={handleChange} />
                </form>
            </div>
        </div>
    );
}

export default App;