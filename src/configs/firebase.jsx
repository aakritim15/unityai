import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBZQLPyAOn-QkKaD9yu9raE-ioCmBcakJY",
    authDomain: "testyy7845.firebaseapp.com",
    projectId: "testyy7845",
    storageBucket: "testyy7845.firebasestorage.app",
    messagingSenderId: "373152889534",
    appId: "1:373152889534:web:110b7aaed5c588b32a7cef",
    measurementId: "G-9XMQBXT89T"
  };

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const provider = new GithubAuthProvider();

export { auth, googleProvider, provider};