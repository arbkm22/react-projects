import React from "react";

function Weather(props) {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const day = now.getDay();
    const currentTime = new Date().toLocaleTimeString();

    return (
        <div className="main">
            <div className="display">
                {props.data && props.data.map((item, index) => (
                    <div 
                        key={index}
                        className='weather-data'
                    >
                        <div className="first-row">
                            <img 
                                src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                                className="weather-icon"
                                alt=""
                            ></img>
                            <div className="weather-stat">{item.main.temp}{'\u00b0'}C</div>
                            <div className="left-items">
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
        </div>
    );
}

export default Weather;