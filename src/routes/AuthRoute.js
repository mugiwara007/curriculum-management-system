import React, { useEffect } from "react"
import { useRouter } from 'next/router';
import { useAuth } from "src/contexts/AuthContext"

const AuthRoute = ({ children }) => {
  const { currentUser } = useAuth()
  const router = useRouter()

useEffect(() => {
    if (currentUser) {
        return <>{children}</>
    }
    else {
        router.push('/login')
        return <></>
    }
}, []);

}

export default AuthRoute