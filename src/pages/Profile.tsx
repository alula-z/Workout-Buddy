import Layout from "../layouts/layouts";
import {auth, db} from "../firebase";
import { useNavigate } from "react-router-dom";
import {doc,getDoc} from 'firebase/firestore';
import { useState,useEffect } from "react";
export default function Profile(){
    const user = auth.currentUser;
    const nav = useNavigate();
    const uid = user?.uid;
    const [userData, setUserData] = useState<userProfile | null>(null);

    type userProfile = {
        uid: string;
        firstName: string;
        lastName: string;
        email: string | null;

    };
    const  fetchUserProfile = async() => {
        try{
            if(uid){
                const fetchedDoc = doc(db, "users", uid, "profile-data", "profile");
                const docSnap = await getDoc(fetchedDoc);
                const data = docSnap.data();
                const firstName = data?.["first-name"];
                const lastName = data?.["last-name"];

                const userData = {
                    uid: uid,
                    firstName: firstName,
                    lastName: lastName,
                    email: user?.email,
                }
                setUserData(userData);
            }
        }catch(error){
        console.log(error);
        }
    }
    useEffect(() =>{
        fetchUserProfile();
    }, []);
    
    

    return(
        <div>
            <Layout>
                <h2>Profile here</h2>
                <div className = "profile-section">
                    <div className = "profile-header">
                    {userData ? (
                        <>
                            <h2>{userData.firstName} {userData.lastName}</h2>
                            <p>Email: {userData.email}</p>
                            <p>UID: {userData.uid}</p>
                        </>
                        ) : (
                        <p>Loading profile...</p>
                        )}
                        
                    </div>
                </div>
            </Layout>
        </div>
    );
}