import { Timestamp } from "firebase/firestore";

// интерфейс записи
export interface Item {
  id: string;
  content: string;
  date: Timestamp;
  img: string;
}
