import React, { useEffect } from "react"
import { useRouter } from 'next/router';
import { useAuth } from "src/contexts/AuthContext"

const AuthRoute = () => {
  const { currentUser } = useAuth()
  const router = useRouter()

useEffect(() => {
    if (currentUser) {
        return 
    }
    else {
        router.push('/')
        return
    }
}, []);

}

export default AuthRoute