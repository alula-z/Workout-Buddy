import Layout from '../layouts/layouts'
import {auth, db }from '../firebase';
import type { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { PieChart} from '@mui/x-charts/PieChart';
import { collection, getDocs,getCountFromServer } from 'firebase/firestore';


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
    const [user, setUser] = useState<User | null>(null);
    const [sport, setSport] = useState('');
    const [basketballData, setBasketballData] = useState<basketballDataForm[]>([]);
    const [runningData, setRunningData] = useState<runningDataForm[]>([]);
    const [basketballWorkoutCount, setBasketballWorkoutCount] = useState('');
    const [runningWorkoutCount, setRunningWorkoutCount] = useState('');
    const fetchWorkouts = async() => {
        try{
            if(user){
            const basketballCollection = collection(db, "users", user.uid, "Basketball");
            const runningCollection = collection(db, "users", user.uid, "Running");
            const basketballSnapshot = await getCountFromServer(basketballCollection);
            const runningSnapshot = await getCountFromServer(runningCollection);
            setBasketballWorkoutCount(basketballSnapshot.data().count.toString());
            setRunningWorkoutCount(runningSnapshot.data().count.toString());
            }else{
                return;
            }
        }catch(error){
            console.log(error);
        }
    }
    const fetchWorkoutStats= async() =>{
        try{
            if(user){
                const fetchedCollection = collection(db, "users", user.uid, sport);
                const fetchedDocs = getDocs(fetchedCollection);
                if(sport == 'Basketball'){
                    const tempBasketballData : basketballDataForm[] = [];

                    (await fetchedDocs).forEach((doc) => {
                        const data = doc.data();
                        const currBasketballDoc : basketballDataForm = {
                            date: data.date,
                            madeShots: data.madeShots,
                            missedShots: data.missedShots,
                            madeThrees: data.madeThrees,
                            missedThrees:data.missedThrees,
                            totalShots: data.totalShots,
                            totalThreeAttempted: data.totalThreeAttempted,
                        }
                        tempBasketballData.push(currBasketballDoc);
                    })

                    setBasketballData(tempBasketballData);
                }else if(sport == 'Running'){
                        const tempRunningData: runningDataForm[] = [];
                        (await fetchedDocs).forEach((doc) => {
                            const data = doc.data();
                            const currRunningDoc : runningDataForm = {
                                date: data.date,
                                time_ran: data.time_ran,
                                distance_ran_mi: data.distance_ran_mi,
                                average_time: data.average_time,
                            }
                            tempRunningData.push(currRunningDoc);
                        })
                        setRunningData(tempRunningData);
                        console.log(runningData);
                }
            }
        }catch(error){
            console.log(error);
        }
    }
    

    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
        setUser(firebaseUser);
        }
    });
    return () => unsubscribe();
    }, []);

    useEffect(() => {
        if(user){
            fetchWorkouts();
        }
    },[user]);
    useEffect(() =>{
        if (sport){
            fetchWorkoutStats();
        }
    }, [sport]);

    return (
    <Layout>
        <h1> Welcome {user?.email}</h1>
        <div className = "data">
            <div className = "workouts-graph">
                <h3>Workouts</h3>
                {basketballWorkoutCount && runningWorkoutCount ? ( 
                <PieChart
                    colors = {['lightGreen', 'lightBlue', "lightYellow"]}
                    series = {[
                        {
                            data: [
                                {id: 0, value: Number(basketballWorkoutCount), label: 'Basketball'},
                                {id: 1, value: Number(runningWorkoutCount), label: 'Running'},
                            ],
                            cornerRadius: 6,
                        }
                    ]}
                    width={200}
                    height={200}
                />
                ) : (
                    <h2 style={{marginLeft: '2rem'}}>...Loading </h2>
                )}
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
                                    data:[
                                        {id: 0, value : basketballData.reduce((sum, d) => sum + d.madeShots, 0), label: "FG Made"},
                                        {id: 1, value :basketballData.reduce((sum, d) => sum + d.missedShots,0), label: "FG Missed"},
                                    ],
                                    cornerRadius: 3,
                                }]
                            }
                            width={150}
                            height = {150}
                        />
                        <p>FG%: {(Number(basketballData.reduce((sum, d) => sum + d.madeShots,0))/Number(basketballData.reduce((sum, d) => sum + d.totalShots, 0))).toFixed(2).toString()}%</p>
                        </div>
                        <div className = "stat-category">
                        <PieChart
                            colors = {["Green",  "red"]}
                            series={
                                [{
                                    data: [
                                        {id: 0, value :basketballData.reduce((sum, d) => sum + d.madeThrees,0), label: "Threes Made"},
                                        {id: 1, value :basketballData.reduce((sum, d) => sum + d.missedThrees,0), label: "Threes Missed"},
                                    ],
                                    cornerRadius: 3,
                                }]

                            }
                            width={150}
                            height = {150}
                        />
                        <p>3P%: {(Number(basketballData.reduce((sum, d) => sum + d.madeThrees,0))/Number(basketballData.reduce((sum, d) => sum + d.totalThreeAttempted, 0))).toFixed(2).toString()}%</p>
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