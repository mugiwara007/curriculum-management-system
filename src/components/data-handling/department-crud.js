import React, { useState, useEffect, useContext } from "react";
import { db } from 'src/firebase/firebase-auth'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const DeptCrud = React.createContext()

export function deptAuth()
{
    return useContext(DeptCrud)
}

export function DeptProvider({ children }) {

    const deptCollectionRef = collection(db, "departments");
  
    function addDept (deptCode, deptDesc, collDepCode) 
    {
      addDoc(deptCollectionRef, 
        {
        dept_code: deptCode,
        dept_desc: deptDesc,
        colld_code: collDepCode,
      });
    };
  
    const value={
      addDept,
    }
  
    return (
      <DeptCrud.Provider value={value}>
          { children }
      </DeptCrud.Provider>
    )
  }
  