import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router';
import { NextComponentType } from "next";


const withAuth = Component => {
    const router = useRouter()
    const Auth = (props) => {
      // Login data added to props via redux-store (or use react context for example)
      const { currentUser } = useAuth();
  
      // If user is not logged in, return login component
      if (!currentUser) {
        return (
          router.push('/login')
        );
      }
  
      // If user is logged in, return original component
      return (
        <Component {...props} />
      );
    };
  
    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps;
    }
  
    return Auth;
  };
  
  export default withAuth;