import React, { useState, useEffect, useContext } from "react";
import { db } from 'src/firebase/firebase-auth'
import {
  collection,
  getDocs,
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
  // const [newSubCode, setNewSubCode] = useState("");
  // const [newSubDesc, setNewSubDesc] = useState("");
  // const [newSubLec, setNewSubLec] = useState(0);
  // const [newSubLab, setNewSubLab] = useState(0);
  // const [newSubPreReq, setNewSubPreReq] = useState("");
  // const [newSubCoReq, setNewSubCoReq] = useState("");
  // const [newSubUser, setNewSubUser] = useState("");
  // const [newSubKac, setNewSubKac] = useState("");
  // const [newSubClassCode, setNewSubClassCode] = useState("");

  // const [subjects, setSubjects] = useState([]);
  const usersCollectionRef = collection(db, "subjects");

  function addSubject (newSubCode,newSubDesc,newSubLec,newSubLab,
    newSubPreReq,newSubCoReq,newSubUser,newSubKac,newSubClassCode) {
    addDoc(usersCollectionRef, {
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

  const updateSubject = async (id, age) => {
    const subjectDoc = doc(db, "subjects", id);
    const newFields = { age: age + 1 };
    await updateDoc(subjectDoc, newFields);
  };

  const deleteSubject = async (id) => {
    const subjectDoc = doc(db, "subjects", id);
    await deleteDoc(subjectDoc);
  };

  // useEffect(() => {
  //   const getSubjects = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getSubjects();
  // }, []);

  const value={
    addSubject
  }

  return (
    <SubjectCrud.Provider value={value}>
        { children }
    </SubjectCrud.Provider>
  )
}
