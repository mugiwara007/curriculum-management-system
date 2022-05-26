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
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
        archive:false,
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
  