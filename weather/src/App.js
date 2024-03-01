import './App.css';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function App() {

    // TODO : Migrate from Accuweahter -> OpenWeather

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
            // try {
            //     const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.REACT_APP_ACCUWEATHER}&q=${inputValue}`);
            //     const data = await response.json();
            //     console.log('data: ', data);
            //     setSearchResponse(data);
            // } catch (error) {
            //     console.error('Error fetching Weather Data: ', error);
            // }

            try {
                const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_OPENWEATHER}`);
                const data = await response.json();
                console.log('openweather: ', data);
                setSearchResponse(data);
                // console.log('searchResponse: ', searchResponse);
            } catch (error) {
                console.error('Error fetching data from OpenWeather: ', error)
            }

            // console.log('searchResponse: ', searchResponse);
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

    const handleClick = (city, state, countryCode) => {
        console.log(`city: ${city} | state: ${state} | countryCode: ${countryCode}`);
        handleClose();
    }
    
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
                    {/* <ul> */}

                        {searchResponse.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => handleClick(item.name, item.state, item.country)}
                                className="searchResponse"
                            >
                                <strong>City:</strong> {item.name},
                                <strong>State: </strong> {item.state}
                            </div>
                        ))}
                    {/* </ul> */}
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
