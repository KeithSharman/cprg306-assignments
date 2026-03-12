'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context"; // path: week-8/_utils/auth-context.js
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import items from "./items.json";

interface ItemProps {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

function cleanItemName(raw: string) {
  if (!raw) return "";
  const firstPart = raw.split(",")[0];
  return firstPart.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uFE0F|[\u2011-\u26FF])/g, "").trim();
}

export default function Page() {
  const { user } = useUserAuth();
  const router = useRouter();

  const [selectedItemName, setSelectedItemName] = useState<string>("");

//protection, show redirect if not signed in
  useEffect(() => {
    if (user === null) {
      // redirect to landing page
      router.replace("/week-8");
    }
  }, [user, router]);

  // while we don't know auth state yet, render loading
  if (user === undefined) {
    return (
      <main className="min-h-screen p-6 flex items-center justify-center">
        <p>Checking authentication…</p>
      </main>
    );
  }

  // specifically render nothing if user null, while redirect happens
  if (user === null) {
    return null;
  }

  // === Authenticated: render the shopping list ===
  function handleAddItem(newItem: { name: string; quantity: number; category: string }) {
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
    const item: ItemProps = {
      id,
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category.toLowerCase(),
    };

    (items as ItemProps[]).push(item);
  }

  function handleItemSelect(item: ItemProps | null) {
    const rawName = item?.name ?? "";
    const cleaned = cleanItemName(rawName);
    setSelectedItemName(cleaned);
  }

  return (
    <main className="min-h-screen p-6 bg-slate-50">
      <h1 className="text-center text-2xl font-bold py-2 m-2">Shopping List</h1>
      <nav className="text-center text-lg p-1 m-1">
        <Link href="/week-8" className="border border-black px-2 py-1 hover:bg-black hover:text-white">Home</Link>
      </nav>

      <div className="flex gap-6 mt-6">
        {/* Left column: NewItem + ItemList */}
        <div className="w-1/2 space-y-4">
          <NewItem onAddItem={handleAddItem} />
          <ItemList onItemSelect={handleItemSelect} />
        </div>

        {/* Right column: Meal ideas */}
        <div className="w-1/2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}