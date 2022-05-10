import React, { useState, useEffect, useContext } from "react";
import { db } from 'src/firebase/firebase-auth'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, getAuth, updatePassword} from 'firebase/auth'
import { auth } from 'src/firebase/firebase-auth'

const UserCrud = React.createContext()

export function userAuth(){
    return useContext(UserCrud)
}

export function UserProvider({ children }) 
{

  const usersCollectionRef = collection(db, "users");

  function addUser (Email, Name, Pass, UserCode, UserName, UserLevel) 
  {
    addDoc(usersCollectionRef, 
    {
      email: Email,
      name: Name,
      password: Pass,
      usercode: UserCode,
      username: UserName,
      userlevel: UserLevel
    });

    createUserWithEmailAndPassword(auth, Email, Pass)
        .then((userCredential) => 
        {
            const user = userCredential.user;
        })
        .catch((error) => 
        {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

      return
  };

  function updateUser(id, newEmail, Name, Pass, UserCode, UserName, UserLevel) 
  {
    const userDoc = doc(db, "users", id);
    //const user = auth.currentUser;
    const newFields = 
    {
      email: newEmail,
      name: Name,
      password: Pass,
      usercode: UserCode,
      username: UserName,
      userlevel: UserLevel
    };
    updateDoc(userDoc, newFields);

    const auth = getAuth();
    // const Pass = getASecureRandomPassword();

    updateEmail(auth.currentUser, newEmail).then(() => {
      // Email updated!
      // ...
      // alert(Email)
    }).catch((error) => {
      // An error occurred
      // ...
    });
    
    
    updatePassword(user, Pass).then(() => {
      // Update successful.
      alert(Pass)
    }).catch((error) => {
      // An error ocurred
      // ...
    });
    // return
  };

  function login(Email, Pass)
  {
    signInWithEmailAndPassword(auth, Email, Pass)
    .then((userCredential) => {
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

    return
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  const value={
    addUser,
    updateUser,
    login
  }

  return (
    <UserCrud.Provider value={value}>
        { children }
    </UserCrud.Provider>
  )
}
