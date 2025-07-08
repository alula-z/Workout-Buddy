import Layout from "../layouts/layouts";
import { Table,TableBody,TableCell,TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import {auth,db} from '../firebase';
import { collection,getDocs } from "firebase/firestore";
import type { User } from "firebase/auth";
export default function AllStats() {
    
    type basicRowData = {
        date: string,
        sport: string,
    }
    const [basicData, setBasicData] = useState<basicRowData[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const fillTable = async() =>{
        try{
            if(user){
                const uid = user.uid;
                const basketballCollectionData = collection(db, "users", uid, "Basketball");
                const runningColelctionData = collection(db, "users", uid, "Running");
                const tempData : basicRowData[] = [];
                const basketballData = getDocs(basketballCollectionData);
                const runningData = getDocs(runningColelctionData);
                (await basketballData).forEach((doc) => {
                    const data = doc.data();
                    tempData.push({date: data.date, sport: "Basketball"});
                });
                (await runningData).forEach((doc) =>{
                    const data = doc.data();
                    tempData.push({date: data.date, sport: "Running"})
                })
                setBasicData(tempData);
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
                fillTable();
            }
        },[user]);
    return(
        <Layout>
            <div>
                <h2>All Stats</h2>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align = "left">Sport</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {basicData.map((row) =>(
                                <TableRow style={{justifyItems: "space-between", backgroundColor: "lightGray"}}>
                                    <TableCell >{row.date}</TableCell>
                                    <TableCell align = "left">{row.sport}</TableCell>
                                </TableRow>
                            ))}
                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Layout>
    )
}