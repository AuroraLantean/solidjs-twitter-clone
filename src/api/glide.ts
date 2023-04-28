import { addDoc, collection, doc, DocumentReference, getDoc, getDocs,  limit, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../db";
import { Glide } from "../types/Glide";
import { User } from "../types/User";

const getGlides = async () => {
  const constraints = [
    orderBy("date", "desc"),
    limit(10)
  ]
  /*if (conditions){
    constraints.push(...)
  }*/
  const q = query(collection(db, "glides"), ...constraints);
  //doc(db, "glides", "glide_id")
  const qSnapshot = await getDocs(q);

  const glides = await Promise.all(qSnapshot.docs.map(async doc => {
    const glide = doc.data() as Glide;
    const userSnap = await getDoc(glide.user as DocumentReference);
    glide.user = userSnap.data() as User;

    return {...glide, id: doc.id};
  }))
  return {glides};
}

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
  createGlide,
  getGlides
}