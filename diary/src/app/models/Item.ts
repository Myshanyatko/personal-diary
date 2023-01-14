import { Timestamp } from "firebase/firestore";

export interface Item {
  id: string;
  content: string;
  date: Timestamp;
  img: string;
}
