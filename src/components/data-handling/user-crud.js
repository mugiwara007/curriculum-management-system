import React, { useState, useEffect, useContext } from "react";
import { db } from 'src/firebase/firebase-auth'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from 'src/firebase/firebase-auth'

const UserCrud = React.createContext()

export function userAuth(){
    return useContext(UserCrud)
}

export function UserProvider({ children }) {
  // const [newSubCode, setNewSubCode] = useState("");
  // const [newSubDesc, setNewSubDesc] = useState("");
  // const [newSubLec, setNewSubLec] = useState(0);
  // const [newSubLab, setNewSubLab] = useState(0);
  // const [newSubPreReq, setNewSubPreReq] = useState("");
  // const [newSubCoReq, setNewSubCoReq] = useState("");
  // const [newSubUser, setNewSubUser] = useState("");
  // const [newSubKac, setNewSubKac] = useState("");
  // const [newSubClassCode, setNewSubClassCode] = useState("");

  const usersCollectionRef = collection(db, "users");

  function addUser (Email, Name, Pass, UserCode, UserName, UserLevel) {
    addDoc(usersCollectionRef, {
      email: Email,
      name: Name,
      password: Pass,
      usercode: UserCode,
      username: UserName,
      userlevel: UserLevel
    });

    createUserWithEmailAndPassword(auth, Email, Pass)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

      return
  };

  function login(newEmail, newPass){
    signInWithEmailAndPassword(auth, newEmail, newPass)
    .then((userCredential) => {
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

    return
}

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  const value={
    addUser,
    login,
  }

  return (
    <UserCrud.Provider value={value}>
        { children }
    </UserCrud.Provider>
  )
}
