import { useState } from "react";
import Layout from "../layouts/layouts";
import BasketballForm from "../components/forms/BasketballForm";
import RunningForm from "../components/forms/RunningForm";
export default function Create(){
    const [sport, setSport] = useState("");
    const renderFields = () =>{
        switch (sport) {
            case "Basketball":
                return <BasketballForm sport = {sport}/>
            case "Running":
                return <RunningForm sport = {sport}/>
            default: 
                return null;
        }
    }
    
    return(
        <Layout>
            <div>
            <select value = {sport} onChange={(e) => setSport(e.target.value)}>
                <option value = "">Select a Sport</option>
                <option value = "Basketball">Basketball</option>
                <option value = "Running">Running</option>
            </select>
                {renderFields()}
            </div>
        </Layout>
    )
}