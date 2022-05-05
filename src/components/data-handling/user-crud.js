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

  const usersCollectionRef = collection(db, "users");

  function addUser (Email, Name, Pass, UserCode, UserName, UserLevel) {
    createUserWithEmailAndPassword(auth, Email, Pass)
    .then((userCredential) => {
      const user = userCredential.user;

      addDoc(usersCollectionRef, {
        uid: user.uid,
        email: Email,
        name: Name,
        password: Pass,
        usercode: UserCode,
        username: UserName,
        userlevel:  Number(UserLevel)
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

      return
  };

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
    addUser
  }

  return (
    <UserCrud.Provider value={value}>
        { children }
    </UserCrud.Provider>
  )
}
