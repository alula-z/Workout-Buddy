import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth,db } from "../firebase"
import { doc,setDoc,collection } from "firebase/firestore"

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secondaryPassword, setSecondaryPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
          //Create user with email and password
          await createUserWithEmailAndPassword(auth, email, password);

          //Sign in newly created user
          await signInWithEmailAndPassword(auth,email,password);
          //Create data to input to User
          const userProfileData = {
            firstName: firstName,
            lastName: lastName,
          }
          const user = auth.currentUser;
          //New user uid
          if(user){
            const uid = user.uid;
            //Add data to database
            const userData = doc(collection(db, "users", uid, "Profile"));
            await setDoc(userData, userProfileData, {merge: true});
          }

          //navigate to home page
          navigate('/home');
        } catch (error) {
          alert('Login failed: ' + error)
        }
    }
    return (
        <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleLogin}>
        <input
          type = "text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          type = "text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={secondaryPassword}
          onChange={(e) => setSecondaryPassword(e.target.value)}
          placeholder="Retype Password"
          required
        />
        
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/">Log in</Link></p>
    </div>
    )
}