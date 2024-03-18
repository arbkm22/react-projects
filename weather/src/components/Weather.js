import React, { useState, useEffect } from "react";

function Weather(props) {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const day = now.getDay();
    let currentTime = new Date().toLocaleTimeString();
    let modifiedTime = currentTime.substring(0, currentTime.length - 6) + ' ' + currentTime.substring(currentTime.length - 2);
    currentTime = modifiedTime;

    const [cityName, setCityName] = useState(props.city);
    useEffect(() => {
        setCityName(props.city);
    }, [props.city]);

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (props.data && props.weatherIcon) {
            setIsReady(true);
        }
    }, [props.data, props.weatherIcon]);

    return (
        <div className="main">
            {isReady ? (
                <>
                    <h1 className="city-name">{cityName}</h1>
                    {props.data && props.data.map((item, index) => (
                        <div 
                            key={index}
                            className='weather-data'
                        >
                            <div className="first-row">
                                <img 
                                    src={require(`../assets/images/${props.weatherIcon}.svg`)}
                                    className="weather-icon"
                                    alt="weather icon"
                                ></img>
                            </div>
                            <div className="second-row">
                                <div className="weather-stat">{Math.round(item.main.temp)}{'\u00b0'}</div>
                                <div className="top">
                                    <p>{(item.weather[0].main)}</p>
                                </div>
                                <div className="bot">
                                    <p>{days[day]}, {currentTime}</p>
                                </div>                        
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div className="welcome-screen">
                    <h1>Welcome!</h1>
                    <p>Search for a city...</p>
                </div>
            )}
        </div>
    );
}

export default Weather;