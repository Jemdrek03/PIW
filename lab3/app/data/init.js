// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAbQ98dAMGV_XXPD2tMX5eLbuFgRBmaRtE",
    authDomain: "zakletastrona.firebaseapp.com",
    projectId: "zakletastrona",
    storageBucket: "zakletastrona.firebasestorage.app",
    messagingSenderId: "268213358198",
    appId: "1:268213358198:web:de7081704b8c29208cd957",
    measurementId: "G-X2Y9FS2DTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const firestore = getFirestore(app);