import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAflqbo2plkMavLSaGbUOp84SZTwpXgc8U",
  authDomain: "unityai-1d0f4.firebaseapp.com",
  projectId: "unityai-1d0f4",
  storageBucket: "unityai-1d0f4.firebasestorage.app",
  messagingSenderId: "883090403531",
  appId: "1:883090403531:web:ec7c811f7bcbeede3eeb4e",
  measurementId: "G-368EHTH6WF"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const provider = new GithubAuthProvider();

export { auth, googleProvider, provider};