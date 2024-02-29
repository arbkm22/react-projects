import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function App() {

    const [inputValue, setInputValue] = useState("");
    const [city, setCity] = useState("");
    const [show, setShow] = useState(false);
    const [searchResponse, setSearchResponse] = useState("");
    const [resp, setResp] = useState([]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.REACT_APP_ACCUWEATHER}&q=${inputValue}`);
                const data = await response.json();
                setSearchResponse(data.data);
            } catch (error) {
                console.error('Error fetching Weather Data: ', error);
            }
        };
        fetchData();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue != undefined && inputValue != null) {
            console.log('inputValue: ', inputValue);
            const inpVal = inputValue;
            setCity(inpVal);
        }
        console.log('city: ', city);
        
        // API call
        axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.REACT_APP_ACCUWEATHER}&q=${inputValue}`)
        .then(response => {
            setSearchResponse(response.data);
        })
        .catch(error => {
            console.log('error calling api: ', error);  
        });

        handleShow()
        // setInputValue('');
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
                    {/* {resp && (
                        <ul>
                            {resp.map((item, index) => {
                                <li key={index}>
                                    <strong>City: </strong> {item.LocalizedName},
                                </li>
                            })}
                        </ul>
                    )} */}
                    {resp}
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
