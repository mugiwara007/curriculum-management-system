import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useContext, useState, useEffect } from 'react'
import { auth } from 'src/firebase/firebase-auth'
import { db } from 'src/firebase/firebase-auth'
import { collection ,addDoc } from "firebase/firestore";
import { useRouter } from 'next/router';

const AuthContext = React.createContext()

const usersCollectionRef = collection(db, "users");

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [userID, setUserID] = useState()
    const [userEmailPassID, setUserEmailPassID] = useState()
    const [userLevel, setUserLevel] = useState()
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userPass, setUserPass] = useState()
    const router = useRouter();

    function register(fname,mname,sname,email, password){
        addDoc(usersCollectionRef, {
            firstName: fname,
            middleInitial: mname,
            surname: sname,
            email: email,
            password: password,
            userlevel: 1,
          });

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

        return
    }

    function login(email, password){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            return false
        });

        return
    }

    function signout(){
        signOut(auth).then(() => {
            // Sign-out successful.
            setCurrentUser("")
            router.push("/")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

        return
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user){
                setCurrentUser(user)
                setUserLevel(user.userlevel)
            } 
            else{
                setCurrentUser("")
                setUserLevel("")
            }
          
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userLevel,
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

