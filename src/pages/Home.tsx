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
        <div className = "data-graph">
            <select value={sport} onChange={(e) => setSport(e.target.value)}> 
                <option>Basketball</option>
                <option>Running</option>
            </select>
            <PieChart
                series = {[
                    {
                        data: [
                            {id: 0, value: 10, label: 'Dummy data A'},
                            {id: 0, value: 20, label: 'Dummy data B'},
                        ]
                    }
                ]}
                width={200}
                height={200}
                />
        </div>
    </Layout>

    )
}