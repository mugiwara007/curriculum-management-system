import React, { useState, useEffect, useContext } from "react";
import { db } from 'src/firebase/firebase-auth'

import 
{
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const CollegeCrud = React.createContext()

export function collAuth()
{
    return useContext(CollegeCrud)
}
   
export function CollegeProvider({ children }) 
{
    const collegesCollectionRef = collection(db, "colleges");
      
    function addCollege (cCode,cDesc,cLogo,) 
    {
        addDoc(collegesCollectionRef, 
        {
            coll_code: cCode,
            coll_desc: cDesc,
            coll_logo: cLogo,
            archive:false,
        });
    };
    
    const value=
    {
        addCollege,
        // updateCollege
    }
    
    return (
        <CollegeCrud.Provider value={value}>
            { children }
        </CollegeCrud.Provider>
    )
}

    
