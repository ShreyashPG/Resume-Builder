// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "projectspg-c25e1.firebaseapp.com",
  projectId: "projectspg-c25e1",
  storageBucket: "projectspg-c25e1.firebasestorage.app",
  messagingSenderId: "953081586427",
  appId: "1:953081586427:web:6c003430dd3df65653065e",
  measurementId: "G-2438SBPH8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
export { app, analytics };
export { firebaseConfig }; // Export the configuration if needed elsewhere
