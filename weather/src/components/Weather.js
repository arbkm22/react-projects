import React, { useState, useEffect } from "react";
import Rain from '../assets/images/Rain.svg';
import Drizzle from '../assets/images/Drizzle.svg';
import Clouds from '../assets/images/Clouds.svg';
import Clear from '../assets/images/Clear.svg';
import Snow from '../assets/images/Snow.svg';
import Thunderstorm from '../assets/images/Thunderstorm.svg';


function Weather(props) {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const day = now.getDay();
    const currentTime = new Date().toLocaleTimeString();

    let icon;
    switch (props.weatherIcon) {
        case 'Rain':
            icon = <Rain />
        case 'Drizzle':
            icon = <Drizzle />
        case 'Clouds':
            icon = <Clouds />
        case 'Clear':
            icon = <Clear />
        case 'Snow':
            icon = <Snow />
        case 'Thunderstorm':
            icon = <Thunderstorm />
    }

    return (
        <div className="main">
            {props.data && props.data.map((item, index) => (
                <div 
                    key={index}
                    className='weather-data'
                >
                    <div className="first-row">
                        <img 
                            src={icon}
                            className="weather-icon"
                            alt=""
                        ></img>
                        <div className="weather-stat">{item.main.temp}{'\u00b0'}C</div>
                        <div className="left-items-container">
                            <div>Humidity: {item.main.humidity}%</div>
                            <div>Wind: {Math.round(item.wind.speed * (18/5))} km/h</div>
                        </div>
                    </div>
                    <div className="second-row">
                        Weather
                        {
                            <div className="right-items">
                                <p>{days[day]}, {currentTime}</p>
                                <p>{(item.weather[0].description)}</p>
                            </div>
                        }
                    </div> 
                </div>
            ))}
        </div>
    );
}

export default Weather;