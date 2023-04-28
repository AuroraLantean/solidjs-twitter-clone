import { DocumentReference, Timestamp } from "firebase/firestore";
import { User } from "./User";

export interface Glide {
  id: string;
  uid: string;
  content: string;
  user: User | DocumentReference;
  likesCount: number;
  subglidesCount: number;
  date: Timestamp;//Date
}
/*displayName: (n: string) => string;
is the type for:
displayName: (lastName: string) => { return person.firstName + " " + lastName}
*/