import './App.css';
import { useState } from 'react';

function App() {

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            setTasks([...tasks, inputValue]);
            setInputValue('');
        }
        console.log('inputValue: ', inputValue);
        console.log('tasks: ', tasks);
    }

    const handleChange = (e) => {
        let inpVal = e.target.value;
        setInputValue(inpVal);
    }

    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([]);

    return (
        <div className="App">
            <div className="todo">
                <p className="heading">To Do List</p>
                <form onSubmit={handleSubmit} >
                    <input
                        name="item"
                        placeholder="Add New"
                        className="input-box" 
                        value={inputValue}
                        onChange={handleChange} />
                </form>
                <div className="added-items">
                    <ul>
                        {tasks.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;