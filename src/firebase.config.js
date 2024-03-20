// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChfX4t12uJz2kc-TbE8cMUqMSyg2gReJg",
  authDomain: "yt-bcbd4.firebaseapp.com",
  projectId: "yt-bcbd4",
  storageBucket: "yt-bcbd4.appspot.com",
  messagingSenderId: "757149298247",
  appId: "1:757149298247:web:bb1da716046109ac324b62",
  measurementId: "G-EJ26459J1L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;
