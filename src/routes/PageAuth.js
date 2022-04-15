import React, {useEffect} from 'react'
import { auth } from 'src/firebase/firebase-auth'
import { useRouter } from 'next/router';

function PageAuth() {
    const router = useRouter() 
    
    useEffect(() => {
        auth.onAuthStateChanged(currentUser => {
            if(currentUser){
                return
            } else {
                router.push("/login")
                return
            }
        });
    }, []);
}

export default PageAuth