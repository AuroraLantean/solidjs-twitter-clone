import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db, firebaseAuth } from "../db";
import { AuthForm, RegisterForm } from "../types/Form";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "../types/User";

const register = async (form: RegisterForm) => {
  const {user: registeredUser} = await createUserWithEmailAndPassword(firebaseAuth, form.email, form.password);//registeredUser is an alias for user
  console.log("registered user:", registeredUser);
  const user: User = {
    uid: registeredUser.uid,
    fullName: form.fullName,
    nickName: form.nickName,
    email: form.email,
    avatar: form.avatar,
    followers: [],
    following: [],
    followersCount: 0,
    followingCount: 0
  }

  await setDoc(doc(db, "users", registeredUser.uid), user);
  //setDoc(doc(firestore_db, "collectionName", uid), your_item);
  return registeredUser;
}

const login = async (loginForm: AuthForm) => {
  const {user} = await signInWithEmailAndPassword(firebaseAuth, loginForm.email, loginForm.password);
  console.log("logged-in user:", user);
  return user;
}

export type AuthType = "register" | "login";
const authenticate = (form: AuthForm, type: AuthType) => {
  return  type === "login" ? login(form) : register(form as RegisterForm);
}

const logout = () => {
  return signOut(firebaseAuth);
}

const getUser = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as User;
}

export { register, logout, login, authenticate, getUser };