import React from "react";
import { useState } from "react";
export default function BasketballForm(){
    const[totalShots, setTotalShots] = useState('');
    const [madeShots, setMadeShots] = useState('');
    const [missedShots, setMissedShots] = useState('');
    const [totalThreeAttempted, setTotalThreeAttempted] = useState(''); 
    const [missedThrees, setMissedThrees] = useState('');
    const [madeThrees, setMadeThrees] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = () =>{
        
    }
    return(
        <div className = "section-div">
            <h1 className = "Title">Basketball Workout</h1>
            <form className = "Form-container" onSubmit={handleSubmit}>
                <div className = "Form-subsection">
                    <h2>Date</h2>
                    <input
                        type = "date"
                        value = {date}
                        onChange = {(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className = "Form-subsection">
                    <h2>Shots Attempted</h2>
                    <input 
                        type = "number"
                        value = {totalShots}
                        onChange = {(e) =>setTotalShots(e.currentTarget.value)}
                        placeholder="Total Shots Taken"
                    />
                </div>
                <div className = "Form-subsection">
                    <h2>Made Shots</h2>
                    <input 
                        type = "number"
                        value = {madeShots}
                        onChange = {(e) =>setMadeShots(e.currentTarget.value)}
                        placeholder= "Made Shots"
                        
                    />
                </div>
                <div className = "Form-subsection">
                    <h2>Missed Shots</h2>
                    <input 
                        type = "number"
                        value = {missedShots}
                        onChange = {(e) =>setMissedShots(e.currentTarget.value)}
                        placeholder="Missed Shots"
                        
                    />
                </div>
                <div className = "Form-subsection">
                    <h2> Threes Attempted</h2>
                    <input 
                        type = "number"
                        value = {totalThreeAttempted}
                        onChange = {(e) =>setTotalThreeAttempted(e.currentTarget.value)}
                        placeholder="Threes Attempted"
                    />
                </div>
                <div className = "Form-subsection">
                    <h2>Made Threes</h2>
                    <input 
                        type = "number"
                        value = {madeThrees}
                        onChange = {(e) =>setMadeThrees(e.currentTarget.value)}
                        placeholder="Made Three Point Shots"

                    />
                </div>
                <div className = "Form-subsection">
                    <h2> Missed Threes</h2>
                    <input 
                        type = "number"
                        value = {missedThrees}
                        onChange = {(e) =>setMissedThrees(e.currentTarget.value)}
                        placeholder="Missed Three Point Shots"
                        
                    />
                </div>
                <button type = "submit">Submit Workout</button>
            </form>
        </div>
    )
}