import React, { useState, useEffect } from "react";

function Weather(props) {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const day = now.getDay();
    const currentTime = new Date().toLocaleTimeString();

    return (
        <div className="main">
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
                        <div className="weather-stat">{Math.round(item.main.temp)}{'\u00b0'}C</div>
                        
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