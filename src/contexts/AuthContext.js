import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useContext, useState, useEffect } from 'react'
import { auth } from 'src/firebase/firebase-auth'
import { db } from 'src/firebase/firebase-auth'
import { collection ,addDoc, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/router';

const AuthContext = React.createContext()

const usersCollectionRef = collection(db, "users");

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [docID, setDocID] = useState()
    const [userID, setUserID] = useState()
    const [userEmailPassID, setUserEmailPassID] = useState()
    const [userLevel, setUserLevel] = useState()
    const [name, setName] = useState()
    const [userName, setUserName] = useState()
    const [userCode, setUserCode] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userPass, setUserPass] = useState()
    const router = useRouter();
    let level
    
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
            router.push('/dashboard');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("User not found.")
            alert(errorMessage)
        });

        return 
    }

    // useEffect(async () => {
    //     const email_id = userID
    //     const addDocID = async (email_id) => {
    //         let ulevel
    //         const userData = query(usersCollectionRef, where("uid", "==", email_id));
    //         const querySnapshot = await getDocs(userData)
    //         await querySnapshot.forEach((doc) => {
    //             setDocID(doc.id)
    //             //users.push({ ...doc.data(), id: doc.id });
    //             ulevel = doc.data().userlevel
    //         });
    //         alert(ulevel)
    //         setUserLevel(ulevel)
    //         alert(userLevel)
    //     }
    //     if(email_id){
    //         addDocID(email_id)
    //     }
        
    // }, [setUserID])

    function signout(){
        signOut(auth).then(() => {
            // Sign-out successful.
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
            setUserLevel(level)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userLevel,
        docID,
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

