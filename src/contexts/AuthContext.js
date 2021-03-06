import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useContext, useState, useEffect } from 'react'
import { auth } from 'src/firebase/firebase-auth'
import { db } from 'src/firebase/firebase-auth'
import { collection ,addDoc, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/router';
import { setEmail } from 'src/components/userModel';
import { setVersion } from 'src/components/create-curriculum/curriculum-model';
import { Dialog } from '@mui/material';

const AuthContext = React.createContext()

const usersCollectionRef = collection(db, "users");

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [docID, setDocID] = useState()
    let userLevel = 0
    const [currVersion, setCurrVersion] = useState(0)
    const router = useRouter();

    function register(fname,mname,sname,email, password){
        const res = createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        addDoc(usersCollectionRef, {
            uid: user.uid,
            firstName: fname,
            middleInitial: mname,
            surname: sname,
            email: email,
            userlevel: 1,
          });

        return
    }

    function login(email, password){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setEmail(user.email)
            router.push('/dashboard');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
        const addDocID = async (email_id) => {
            const userData = query(usersCollectionRef, where("uid", "==", email_id));
            const querySnapshot = await getDocs(userData)
            const users =[]
            await querySnapshot.forEach((doc) => {
                setDocID(doc.id)
                const data = doc.data()
                userLevel=data.userlevel
                //users.push({ ...doc.data(), id: doc.id });
            });
        }

    function signout(){
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem('email');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('CurrID');
            localStorage.removeItem('CurrVer');
            setCurrVersion(0)
            setVersion('1')
            setCurrentUser("")
            setUserLevel(0)
            router.push("/")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

        return
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            if (user){
                addDocID(user.uid)
            }
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userLevel,
        docID,
        currVersion,
        setCurrVersion,
        register,
        login,
        signout
    }
  return (
    <AuthContext.Provider value={ value }>
        { children }
    </AuthContext.Provider>
  )
}

