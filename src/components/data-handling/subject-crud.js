import React, { useState, useEffect, useContext } from "react";
import { db } from 'src/firebase/firebase-auth'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { auth } from 'src/firebase/firebase-auth';

const SubjectCrud = React.createContext()

export function subAuth(){
    return useContext(SubjectCrud)
}

export function SubjectProvider({ children }) {
  const usersCollectionRef = collection(db, "users");
  const subjectsCollectionRef = collection(db, "subjects");
  const archiveCollectionRef = collection(db, "archived_subjects");

  const addSubject = async (newSubCode,newSubDesc,newSubLec,newSubLab,newTotalUnits,newHrPW,
    newSubPreReq,newSubCoReq,newSubKac,newSubClassCode) =>{
      auth.onAuthStateChanged(async user => {
        if (user) {
          let newSubUser=""
          const email_id = user.uid;
          const userData = query(usersCollectionRef, where("uid", "==", email_id));
          const querySnapshot = await getDocs(userData)
          await querySnapshot.forEach((doc) => {
              const data = doc.data()
              newSubUser=data.username
              });
        addDoc(subjectsCollectionRef, {
          sub_code: newSubCode,
          sub_desc: newSubDesc,
          sub_lec: newSubLec,
          sub_lab: newSubLab,
          total_units: newTotalUnits,
          hour_pw: newHrPW,
          sub_preReq: newSubPreReq,
          sub_coReq: newSubCoReq,
          sub_user: newSubUser,
          sub_kac: newSubKac,
          sub_classCode: newSubClassCode
        });
        } else {
          // User is signed out
          // ...
        }
      });
  };

  const updateSubject = async (id, newSubCode,newSubDesc,newSubLec,newSubLab,newTotalUnits,newHrPW,
    newSubPreReq,newSubCoReq,newSubKac,newSubClassCode) => {
    const subjectDoc = doc(db, "subjects", id);
      auth.onAuthStateChanged(async user => {
        if (user) {
          let newSubUser=""
          const email_id = user.uid;
          const userData = query(usersCollectionRef, where("uid", "==", email_id));
          const querySnapshot = await getDocs(userData)
          await querySnapshot.forEach((doc) => {
              const data = doc.data()
              newSubUser=data.username
              });
              const newFields = { 
                sub_code: newSubCode,
                sub_desc: newSubDesc,
                sub_lec: newSubLec,
                sub_lab: newSubLab,
                total_units: newTotalUnits,
                hour_pw: newHrPW,
                sub_preReq: newSubPreReq,
                sub_coReq: newSubCoReq,
                sub_user: newSubUser,
                sub_kac: newSubKac,
                sub_classCode: newSubClassCode,
               };
              updateDoc(subjectDoc, newFields);
        } else {
          // User is signed out
          // ...
        }
      });
  };

  // const deleteSubject = async (id) => {
  //   const subjectDoc = doc(db, "subjects", id);
  //   await deleteDoc(subjectDoc);
  // };

  const archivedSub = async (id, newSubCode,newSubDesc,newSubLec,newSubLab,
    newSubPreReq,newSubCoReq,newSubUser,newSubKac,newSubClassCode) =>{
      const subjectDoc = doc(db, "subjects", id);
      addDoc(archiveCollectionRef, {
        sub_code: newSubCode,
        sub_desc: newSubDesc,
        sub_lec: newSubLec,
        sub_lab: newSubLab,
        sub_preReq: newSubPreReq,
        sub_coReq: newSubCoReq,
        sub_user: newSubUser,
        sub_kac: newSubKac,
        sub_classCode: newSubClassCode
      });
      await deleteDoc(subjectDoc);
  }

  const value={
    addSubject,
    updateSubject,
    archivedSub
    // deleteSubject
  }

  return (
    <SubjectCrud.Provider value={value}>
        { children }
    </SubjectCrud.Provider>
  )
}
