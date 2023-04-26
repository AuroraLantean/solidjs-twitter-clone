import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db, firebaseAuth } from "../db";
import { AuthForm, RegisterForm } from "../types/Form";
import { doc, setDoc } from "firebase/firestore";
import { User } from "../types/User";

const register = async (form: RegisterForm) => {
  const {user: registeredUser} = await createUserWithEmailAndPassword(firebaseAuth, form.email, form.password);//registeredUser is an alias for user

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
  return user;
}

const logout = () => {
  return signOut(firebaseAuth);
}

export { register, logout, login};