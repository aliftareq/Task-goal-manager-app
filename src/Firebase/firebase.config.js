// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrd9HUW8SgK178HgR7Nu_o3c5tL56cpZw",
    authDomain: "task-goal.firebaseapp.com",
    projectId: "task-goal",
    storageBucket: "task-goal.appspot.com",
    messagingSenderId: "1091343997906",
    appId: "1:1091343997906:web:d56c5bcb2f8690c121860b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;