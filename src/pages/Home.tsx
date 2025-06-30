import Layout from '../layouts/layouts'
import {auth }from '../firebase';
import { useState } from 'react';
import { PieChart} from '@mui/x-charts/PieChart';
export default function Home() {

    const user = auth.currentUser;
    const [sport, setSport] = useState('');
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