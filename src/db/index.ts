import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyY75pD0JZX0-mv51g_CEV_WsbBhCeql8",
  authDomain: "glider-d5798.firebaseapp.com",
  projectId: "glider-d5798",
  storageBucket: "glider-d5798.appspot.com",
  messagingSenderId: "837113563474",
  appId: "1:837113563474:web:203f79c4c936681290928b"
};

// Initialize Firebase
export const conn = initializeApp(firebaseConfig);
export const db = getFirestore(conn);
export const firebaseAuth = getAuth(conn);

export const getUsers = async () => {
  const usersCol = collection(db, "users");
  const usersSnap = await getDocs(usersCol);
  const userList = usersSnap.docs.map(doc => doc.data());
  return userList;
}

