import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCJLgiS3W9cSzCl5bCx7KX_5yh_wtPnjSM",
  authDomain: "curmasys.firebaseapp.com",
  projectId: "curmasys",
  storageBucket: "curmasys.appspot.com",
  messagingSenderId: "759838636190",
  appId: "1:759838636190:web:c33250d9e4a9a03d3a238f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)