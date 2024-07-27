import React from "react";
import './Calendar.css';

const FINAL_DATE = new Date('2025-05-25');

function Calendar() {
    let currentDate = new Date();
    let millDiff = Math.abs(FINAL_DATE - currentDate);
    let secsDiff = Math.round(millDiff/1000);
    let minsDiff = Math.round(secsDiff/60);
    let hoursDiff = Math.round(minsDiff/60);
    let daysDiff = Math.round(hoursDiff/24);

    return ( 
        <div className="Calendar">
            <div className="timer">{secsDiff} seconds remaining...</div>
            <div className="timer">{minsDiff} minutes remaining...</div>
            <div className="timer">{hoursDiff} hours remaining...</div>
            <div className="timer">{daysDiff} days remaining...</div>

            {/* <div className="calendar">
                <div className="calendar-item">
                    <div className="flip" id="day"></div>
                    <span class="label">DAY</span>
                </div>
            </div> */}
        </div>
    )
}

export default Calendar;