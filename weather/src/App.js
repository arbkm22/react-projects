import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function App() {

    const [inputValue, setInputValue] = useState("");
    const [city, setCity] = useState("");
    const [show, setShow] = useState(false);
    const [searchResponse, setSearchResponse] = useState([]);

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.REACT_APP_ACCUWEATHER}&q=${inputValue}`);
                const data = await response.json();
                console.log('data: ', data);
                setSearchResponse(data);
            } catch (error) {
                console.error('Error fetching Weather Data: ', error);
            }
            console.log('searchResponse: ', searchResponse);
        };
        if (Object.keys(formData).length !== 0) {
            fetchData();
        }
    }, [formData]);

    useEffect(() => {
        setCity(inputValue);
    }, [inputValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('city: ', city);
        setFormData({cityName: city});

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
                    <ul>
                        {searchResponse.map((item, index) => (
                            <li key='index'>
                                <strong>City:</strong> {item.LocalizedName},
                                <strong>Country: </strong> {item.Country.LocalizedName}
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        onClick={handleClose}
                        variant='primary'
                        size='sm'>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        
    );
}

export default App;
