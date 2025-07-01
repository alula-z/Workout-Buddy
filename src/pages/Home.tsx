import Layout from '../layouts/layouts'
import {auth, db }from '../firebase';
import { useState } from 'react';
import { PieChart} from '@mui/x-charts/PieChart';
import { collection, getDocs } from 'firebase/firestore';
export default function Home() {
    type basketballDataForm = {
        date: string,
        madeShots: number,
        madeThrees: number,
        missedShots: number,
        missedThrees: number,
        totalShots: number,
        totalThreeAttempted: number,   
    }
    type runningDataForm = {
        average_time: string,
        date: '',
        distance_ran_mi: number,
        time_ran: string,
    }

    const initialRunningData : runningDataForm = {
        average_time: '',
        date: '',
        distance_ran_mi: 0,
        time_ran: '',
    }
    const initialBasketballData : basketballDataForm = {
        date:'',
        madeShots: 0,
        madeThrees: 0,
        missedShots: 0,
        missedThrees: 0,
        totalShots: 0,
        totalThreeAttempted: 0,
    }
    
    const user = auth.currentUser;
    const [sport, setSport] = useState('');
    const [basketballData, setBasketballData] = useState(initialBasketballData);
    const [runningData, setRunningData] = useState(initialRunningData);
    const fetchCollection= async() =>{
        try{
            if(user){
                const fetchedCollection = collection(db, "users", user.uid, sport);
                const fetchedDocs = getDocs(fetchedCollection);
                (await fetchedDocs).forEach((doc) => {
                    d
                })
            }
        }catch(error){
            console.log(error);
        }
    }
    return (
    <Layout>
        <h1> Welcome {user?.email}</h1>
        <div className = "data">
            <div className = "workouts-graph">
                <h3>Workouts</h3>
                <PieChart
                    colors = {['lightGreen', 'lightBlue', "lightYellow"]}
                    series = {[
                        {
                            data: [
                                {id: 0, value: 10, label: 'Dummy data A'},
                                {id: 1, value: 20, label: 'Dummy data B'},
                                {id: 2, value: 20, label: 'Dummy data C'},
                            ],
                            cornerRadius: 6,
                        }
                    ]}
                    width={200}
                    height={200}
                />
            </div>
            <div className = "sportSpecific-data">
                <select value={sport} onChange={(e) => setSport(e.target.value)}> 
                        <option value = "">Select a Sport</option>
                        <option>Basketball</option>
                        <option>Running</option>
                </select>
                <h2>Sport: {sport}</h2>
                {(sport == "Basketball") ? (
                    <div className = "stat-row">
                        <div className = "stat-category">
                        <PieChart
                            colors = {["Green",  "red"]}
                            series={
                                [{
                                    data: [
                                        {id: 0, value: 10, label: "FG Made"},
                                        {id: 2, value :10, label: "FG Missed"},
                                    ],
                                    cornerRadius: 3,
                                }]
                            }
                            width={150}
                            height = {150}
                        />
                        <p>FG%: ---</p>
                        </div>
                        <div className = "stat-category">
                        <PieChart
                            colors = {["Green",  "red"]}
                            series={
                                [{
                                    data: [
                                        {id: 0, value :10, label: "Threes Made"},
                                        {id: 1, value :1, label: "Threes Missed"},
                                    ],
                                    cornerRadius: 3,
                                }]

                            }
                            width={150}
                            height = {150}
                        />
                        <p>3P%: ---</p>
                        </div>
                        <div className = "stat-category">
                        <PieChart
                            colors = {["Green", "red"]}
                            series={
                                [{
                                    data: [
                                        {id: 0, value: 20, label: "Free Throws Made"},
                                        {id: 1, value :10, label: "Free Throws Missed"},
                                    ],
                                    cornerRadius: 3,
                                }]

                            }
                            width={150}
                            height = {150}
                        />
                        <p>FT%: ---</p>
                        </div>
                    </div>
                ): (
                    <div>

                    </div>
                )}
            </div>
        </div>
    </Layout>

    )
}