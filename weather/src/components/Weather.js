import React from "react";

function Weather(props) {
    return (
        <div className="main">
            <div className="display">
                {props.data && props.data.map((item, index) => (
                    <div 
                        key={index}
                        className='weather-data'
                    >
                        <img 
                            src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                            className="weather-icon"
                        ></img>
                        <div className="weather-stat">Current Temp: {item.main.temp}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Weather;