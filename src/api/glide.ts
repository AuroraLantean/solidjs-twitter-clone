import { addDoc, collection, doc, Timestamp } from "firebase/firestore";
import { db } from "../db";
import { Glide } from "../types/Glide";

const createGlide = async (form: {
  content: string;
  uid: string;
}): Promise<Glide> => {
  const userRef = doc(db, "users", form.uid);
  var newStr = form.content.replace(/\n/g, '.')
  const glideToStore = {
    content: newStr,
    uid: form.uid,
    user: userRef,
    likesCount: 0,
    subglidesCount: 0,
    date: Timestamp.now()
  }
  console.log("glideToStore:",glideToStore);

  const glideCollection = collection(db, "glides");
  const added = await addDoc(glideCollection, glideToStore);
  console.log("added glide id:", added.id)
  return {...glideToStore, id: added.id};
  //notice Glide type = {user: User | DocumentReference; ...}
}


export {
  createGlide
}