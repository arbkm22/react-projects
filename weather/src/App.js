import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'

function App() {

    const [inputValue, setInputValue] = useState("");
    const [city, setCity] = useState("");
    const [show, setShow] = useState(false);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setCity(inputValue);
        console.log('inputValue: ', inputValue);
        
        // API call
        axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.REACT_APP_ACCUWEATHER}&q=${inputValue}`)
        .then(response => {
            console.log('api response: ', response);
        })
        .catch(error => {
            console.log('error calling api: ', error);  
        });

        handleShow()
        setInputValue('');
    }

    const handleShow = (e) => setShow(true);
    const handleClose = (e) => setShow(false);
    
    return (
        <>
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
                        onChange={handleChange} />
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
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Select City</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Select your city
                </Modal.Body>
                <Modal.Footer>
                    <button>Close</button>
                </Modal.Footer>
            </Modal>
        </>
        
    );
}

export default App;
