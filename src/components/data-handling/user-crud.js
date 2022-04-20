import React, { useState, useEffect, useContext } from "react";
import { db } from 'src/firebase/firebase-auth'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

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

  function addUser (newFName, newMName, newLName, newEmail, newPassword) {
    addDoc(usersCollectionRef, {
      firstName: newFName,
      middleInitial: newMName,
      surname: newLName,
      email: newEmail,
      password: newPassword,
      userLevel: 1
    });
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
