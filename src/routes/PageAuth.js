import React, {useEffect} from 'react'
import { auth } from 'src/firebase/firebase-auth'
import { useRouter } from 'next/router';

function PageAuth() {
    const router = useRouter() 

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                return
            } else {
                router.push("/")
                return
            }
        });
    }, []);

    return(
        <h1></h1>
    );
}


export default PageAuth