import { useState } from "react";
import './BasketballForm.css';
import {auth,db} from '../../firebase';
import { collection, doc,setDoc } from "firebase/firestore";
import React from "react";
export default function RunningForm({sport} : {sport: string}) {
    const[distanceRan, setDistanceRan] = useState('');
    const [date, setDate] = useState('');
    const [hoursRan, setHoursRan] = useState('');
    const [minRan, setMinRan] = useState('');
    const [secondsRan, setSecondsRan] = useState('');

    const handleSubmit = async(e: React.FormEvent) => {
        console.log("Entered Handle submit");
        e.preventDefault();
        
        //set user ID if found
        const user = auth.currentUser;
        if(!sport || !date){
            alert("Sport and Date are required");
        }
         if(user){
            //User found and uid is set
            const uid = user.uid;
            console.log("Full Firestore path:", `users/${user.uid}/${sport}/${date}`);
            try{
                const timeRan = (Number(hoursRan) * 3600) + (Number(minRan)* 60 ) + Number(secondsRan);
                let averageTimeInSeconds = timeRan / Number(distanceRan);
                const averageHours = Math.floor(averageTimeInSeconds/3600);
                averageTimeInSeconds %=  3600;
                const averageMin = Math.floor(averageTimeInSeconds / 60);
                averageTimeInSeconds %= 60;
                const averageSec = Math.floor(averageTimeInSeconds);

                const averageTime = averageHours.toString() + " hr(s) " + averageMin.toString() + " min " + averageSec.toString() + " sec";
                const totalTimeRanFormatted = hoursRan + " hr(s) " + minRan + " min " + secondsRan + " sec";
                //Set data fields to userData
                const userData = {
                    distance_ran_mi: Number(distanceRan),
                    time_Ran: totalTimeRanFormatted,
                    average_Time: averageTime,
                    date: date
                }
                console.log(userData);
                const workoutRef = doc(collection(db, "users",uid, sport),date);

                //Add data to Firebase Database
                await setDoc(workoutRef,userData, {merge:true});
                console.log("Saved to:", `users/${uid}/${sport}/${date}`);
                console.log("Data:", userData);
                alert("data saved");
            }catch(error){
                console.log(error);
                alert(error);
            }
       
        }else{
            //Alert when user is not logged in
            alert("User Not Logged In");
        }

    }
  
    return(
        <div className = "section-div">
            <h1 className = "Title">Running Workout</h1>
            <form className = "Form-container" onSubmit={handleSubmit}>
                <div className = "Form-subsection">
                    <h2>Date:</h2>
                    <input
                        type = "date"
                        value = {date}
                        onChange = {(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className = "Form-subsection">
                    <h2>Distance Ran:</h2>
                    <input 
                        type = "number"
                        value = {distanceRan}
                        onChange = {(e) =>setDistanceRan(e.currentTarget.value)}
                        placeholder="Distance ran in miles"
                    />
                </div>
                <div className = "Form-subsection">
                    <h2>Time Ran:</h2>
                </div>
                <div className = "Form-subsection">
                    <h2>Hours Ran:</h2>
                    <input
                        type = "number"
                        value = {hoursRan}
                        onChange = {(e) => setHoursRan(e.target.value)}
                    />
                </div>
                <div className = "Form-subsection">
                    <h2>Min Ran:</h2>
                    <input
                        type = "number"
                        value = {minRan}
                        onChange = {(e) => setMinRan(e.target.value)}
                    />
                </div>
                <div className = "Form-subsection">
                    <h2>Seconds Ran:</h2>
                    <input
                        type = "number"
                        value = {secondsRan}
                        onChange = {(e) => setSecondsRan(e.target.value)}
                    />
                </div>
                <div className = "button-section">
                    <button type = "submit">Submit Workout</button>
                </div>
            </form>
        </div>
    )
}