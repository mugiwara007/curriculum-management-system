import React, { useState, useEffect, useContext } from "react";
import { db } from 'src/firebase/firebase-auth'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const SubjectCrud = React.createContext()

export function subAuth(){
    return useContext(SubjectCrud)
}

export function SubjectProvider({ children }) {

  const subjectsCollectionRef = collection(db, "subjects");

  function addSubject (newSubCode,newSubDesc,newSubLec,newSubLab,
    newSubPreReq,newSubCoReq,newSubUser,newSubKac,newSubClassCode) {
    addDoc(subjectsCollectionRef, {
      sub_code: newSubCode,
      sub_desc: newSubDesc,
      sub_lec: newSubLec,
      sub_lab: newSubLab,
      sub_preReq: newSubPreReq,
      sub_coReq: newSubCoReq,
      sub_user: newSubUser,
      sub_kac: newSubKac,
      sub_classCode: newSubClassCode,
      archivedSub: false
    });
  };

  function updateSubject(id, newSubCode,newSubDesc,newSubLec,newSubLab,
    newSubPreReq,newSubCoReq,newSubUser,newSubKac,newSubClassCode) {
    const subjectDoc = doc(db, "subjects", id);
    const newFields = { 
      sub_code: newSubCode,
      sub_desc: newSubDesc,
      sub_lec: newSubLec,
      sub_lab: newSubLab,
      sub_preReq: newSubPreReq,
      sub_coReq: newSubCoReq,
      sub_user: newSubUser,
      sub_kac: newSubKac,
      sub_classCode: newSubClassCode,
     };
    updateDoc(subjectDoc, newFields);
  };

  const deleteSubject = async (id) => {
    const subjectDoc = doc(db, "subjects", id);
    await deleteDoc(subjectDoc);
  };

  const value={
    addSubject,
    updateSubject,
    deleteSubject
  }

  return (
    <SubjectCrud.Provider value={value}>
        { children }
    </SubjectCrud.Provider>
  )
}
