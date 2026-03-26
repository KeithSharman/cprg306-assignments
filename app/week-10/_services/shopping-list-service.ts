"use client";

import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export async function getItems(userId: string): Promise<Item[]> {
  const itemsRef = collection(db, "users", userId, "items");
  const q = query(itemsRef);
  const querySnapshot = await getDocs(q);
  const items: Item[] = [];
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() } as Item);
  });
  return items;
}

export async function addItem(userId: string, item: Omit<Item, 'id'>): Promise<string> {
  const itemsRef = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsRef, item);
  return docRef.id;
}
