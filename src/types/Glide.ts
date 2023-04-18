import { User } from "./User";

export interface Glide {
  id: string;
  content: string;
  user: User;
  likesCount: number;
  subglidesCount: number;
  date: Date;
}
/*displayName: (n: string) => string;
is the type for:
displayName: (lastName: string) => { return person.firstName + " " + lastName}
*/