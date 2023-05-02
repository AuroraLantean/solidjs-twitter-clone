import { addDoc, collection, doc, DocumentReference, getDoc, getDocs,  limit, orderBy, query, QueryConstraint, QueryDocumentSnapshot, QuerySnapshot, startAfter, Timestamp } from "firebase/firestore";
import { db } from "../db";
import { Glide, UserGlide } from "../types/Glide";
import { User } from "../types/User";

const getGlides = async (lastGlide: QueryDocumentSnapshot | null) => {
  const constraints: QueryConstraint[] = [
    orderBy("date", "desc"),
    limit(10)
  ]
  if (!!lastGlide) {
    constraints.push(startAfter(lastGlide));
  }//this constraint will cause query to return an empty array when the last item has been reached. The lastGlide of an empty array will be undefined, which should be used to stop further loading

  const q = query(collection(db, "glides"), ...constraints);
  //doc(db, "glides", "glide_id")
  const qSnapshot = await getDocs(q);
  const _lastGlide = qSnapshot.docs[qSnapshot.docs.length - 1];

  const glides = await Promise.all(qSnapshot.docs.map(async doc => {
    const glide = doc.data() as Glide;
    const userSnap = await getDoc(glide.user as DocumentReference);
    glide.user = userSnap.data() as User;

    return {...glide, id: doc.id};
  }))
  return {glides, lastGlide: _lastGlide};
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

const getGlideById = async (id: string, uid: string) => {
  const userDocRef = doc(db, "users", uid);
  const userGlideRef = doc(userDocRef, "glides", id);

  const userGlideSnap = await getDoc(userGlideRef);
  const userGlide = userGlideSnap.data() as UserGlide;
  const glideSnap = await getDoc(userGlide.lookup);
  const userDocSnap = await getDoc(userDocRef);
 
  const glide = {
    ...glideSnap.data(),
    user: userDocSnap.data(),
    id: glideSnap.id,
    //lookup: glideSnap.ref.path
  } as Glide;

  return glide;
}

export {
  getGlideById,
  createGlide,
  getGlides
}