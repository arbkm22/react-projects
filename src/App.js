import './App.css';
import { useState } from 'react';

function App() {

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            setTasks([...tasks, { text: inputValue.trim(), checked: false }]);
            setInputValue('');
        }
        console.log('inputValue: ', inputValue);
        console.log('tasks: ', tasks);
    }

    const handleCheckboxChange = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].checked = !updatedTasks[index].checked;
        setTasks(updatedTasks);
    }

    function displayItems(item) {
        return (
            <label>
                <span style={{textDecoration: item.checked ? 'line-through' : 'none'}}>
                    {item.text}
                </span>
            </label>
        )
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
                        onChange={(e) => setInputValue(e.target.value)} />
                </form>
                <div className="added-items">
                    {tasks.map((item, index) => (
                        <div className="task-list">
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => handleCheckboxChange(index)}>
                            </input>
                            {displayItems(item)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;