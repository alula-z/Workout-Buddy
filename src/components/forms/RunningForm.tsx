// import { useState } from "react";
// import { db ,auth} from "../../firebase";
// import { doc,setDoc ,collection} from "firebase/firestore";
// export default function RunningForm({sport} = {sport:String}) {
//     const[distanceRan, setDistanceRan] = useState('');
//     const [date, setDate] = useState('');
//     const [timeRan, setTimeRan] = useState('');
//     const handleSubmit = async(e: React.FormEvent) => {
//         console.log("Entered Handle submit");
//         e.preventDefault();
        
//         //set user ID if found
//         const user = auth.currentUser;
//         if(!sport || !date){
//             alert("Sport and Date are required");
//         }
//          if(user){
//             //User found and uid is set
//             const uid = user.uid;
//             console.log("Full Firestore path:", `users/${user.uid}/${sport}/${date}`);
//             try{
//                 const averageTime = Number(distanceRan);
//                 const missedThrees = Number(totalThreeAttempted) - Number(madeThrees);
//                 //Set data fields to userData
//                 const userData = {
//                     distanceRan: Number(distanceRan),
//                     timeRan: Number(timeRan),
//                     date: date
//                 }
//                 console.log(userData);
//                 const workoutRef = doc(collection(db, "users",uid, sport),date);
//                 //Add data to Firebase Database
//                 await setDoc(workoutRef,userData, {merge:true});
//                 console.log("Saved to:", `users/${uid}/${sport}/${date}`);
//                 console.log("Data:", userData);
//                 alert("data saved");
//             }catch(error){
//                 console.log(error);
//                 alert(error);
//             }
       
//         }else{
//             //Alert when user is not logged in
//             alert("User Not Logged In");
//         }

//     }
  
//     return(
//         <div className = "section-div">
//             <h1 className = "Title">Basketball Workout</h1>
//             <form className = "Form-container" onSubmit={handleSubmit}>
//                 <div className = "Form-subsection">
//                     <h2>Date:</h2>
//                     <input
//                         type = "date"
//                         value = {date}
//                         onChange = {(e) => setDate(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className = "Form-subsection">
//                     <h2>Shots Attempted:</h2>
//                     <input 
//                         type = "number"
//                         value = {totalShots}
//                         onChange = {(e) =>setTotalShots(e.currentTarget.value)}
//                         placeholder="Total Shots Taken"
//                     />
//                 </div>
//                 <div className = "Form-subsection">
//                     <h2>Made Shots:</h2>
//                     <input 
//                         type = "number"
//                         value = {madeShots}
//                         onChange = {(e) =>setMadeShots(e.currentTarget.value)}
//                         placeholder= "Made Shots"
                        
//                     />
//                 </div>
//                 <div className = "Form-subsection">
//                     <h2> Threes Attempted:</h2>
//                     <input 
//                         type = "number"
//                         value = {totalThreeAttempted}
//                         onChange = {(e) =>setTotalThreeAttempted(e.currentTarget.value)}
//                         placeholder="Threes Attempted"
//                     />
//                 </div>
//                 <div className = "Form-subsection">
//                     <h2>Made Threes:</h2>
//                     <input 
//                         type = "number"
//                         value = {madeThrees}
//                         onChange = {(e) =>setMadeThrees(e.currentTarget.value)}
//                         placeholder="Made Three Point Shots"

//                     />
//                 </div>
//                 <div className = "button-section">
//                     <button type = "submit">Submit Workout</button>
//                 </div>
//             </form>
//         </div>