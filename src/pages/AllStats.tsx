import Layout from "../layouts/layouts";
import { Table,TableBody,TableCell,TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import {auth,db} from '../firebase';
import { collection,getDocs } from "firebase/firestore";
export default function AllStats() {
    const user = auth.currentUser;
    
    type basicRowData = {
        date: string,
        sport: string,
    }
    const [basicData, setBasicData] = useState<basicRowData[]>([]);
    const fillTable = async() =>{
        try{
            if(user){
                const uid = user.uid;
                const basketballCollectionData = collection(db, "users", uid, "basketball");
                const runningColelctionData = collection(db, "users", uid, "running");
                const tempData : basicRowData[] = [];
                const basketballData = getDocs(basketballCollectionData);
                const runningData = getDocs(runningColelctionData);
                (await basketballData).forEach((doc) => {
                    const data = doc.data();
                    tempData.push({date: data.date, sport: "basketball"});
                });
                (await runningData).forEach((doc) =>{
                    const data = doc.data();
                    tempData.push({date: data.date, sport: "running"})
                })
                setBasicData(tempData);
            }
            
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fillTable();
    },[]);
    return(
        <Layout>
            <div>
                <h2>All Stats</h2>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Sport</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {basicData ? (
                                <div>
                                {basicData.map((row) =>(
                                    <TableRow>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.sport}</TableCell>
                                    </TableRow>
                                ))}
                                </div>
                            ) : (
                                <h2>Loading ...</h2>
                            )}
                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Layout>
    )
}