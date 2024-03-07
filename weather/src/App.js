import './App.css';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CitySearch from './components/CitySearch';
import Weather from './components/Weather';

function App() {

    const [inputValue, setInputValue] = useState("");
    const [city, setCity] = useState("");
    const [show, setShow] = useState(false);
    const [searchResponse, setSearchResponse] = useState([]);
    const [weather, setWeather] = useState([]);
    const [formData, setFormData] = useState({});
    const [isZoomed, setIsZoomed] = useState(false);
    const [pos, setPos] = useState([]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
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
        }
        if (Object.keys(formData).length !== 0) {
            fetchData();
        }
    }, [formData]);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${pos[0]}&lon=${pos[1]}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER}`);
                
                // current weather api call
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos[0]}&lon=${pos[1]}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER}`);
                const data = await response.json();
                console.log('current weather: ', data);
                // setWeather(data.list);
                let weatherData = [];
                weatherData.push(data);
                console.log('weatherData: ', weatherData);
                setWeather(weatherData);
            } catch (error) {
                console.error('Error fetching weather: ', error);
            }
        }
        if (pos.length !== 0) {
            fetchWeather();
        }
    }, [pos]);

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

    const handleClick = (city) => {
        console.log(`city: ${city.name} | lat: ${city.lat} | long: ${city.lon}`);
        const selectedPos = [city.lat, city.lon];
        setPos(selectedPos);
        handleClose();
    }

    const handleMouseEnter = () => {
        setIsZoomed(true);
    }

    const handleMouseLeave = () => {
        setIsZoomed(false);
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
                    <Weather data={weather} />
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
                        {searchResponse.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => handleClick(item)}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className={`search-container zoom-container${isZoomed ? '.zoomed' : ''}`}
                            >
                                <strong>City:</strong> {item.name},
                                <strong>State: </strong> {item.state}
                            </div>
                        ))}
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
