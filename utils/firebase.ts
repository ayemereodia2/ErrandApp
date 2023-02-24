import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBNUsbn7ytpK8S5ORz6HZf2JH0Jz1AqufI",
  authDomain: "gofer-errandapp.firebaseapp.com",
  projectId: "gofer-errandapp",
  storageBucket: "gofer-errandapp.appspot.com",
  messagingSenderId: "263094751526",
  appId: "1:263094751526:web:260d5b839e9b963fccb1e7",
  measurementId: "G-LKV35ZQKH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app