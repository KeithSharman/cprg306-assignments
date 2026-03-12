'use client';

import Link from "next/link";
import ItemList from "./item-list";
import NewItem from "./new-item";
import items from "./items.json";

interface ItemProps {
    id: string;
    name: string;
    quantity: number;
    category: string;
    sortBy: "name" | "category";
}

export default function Page() {
    function handleAddItem(newItem: { name: string; quantity: number; category: string }) {
        const itemWithId: ItemProps = {
            ...newItem,
            id: Date.now().toString(),
            sortBy: "name"
        };
        items.push(itemWithId);
    }

    return (
        <main>
            <h1 className="text-center text-xl font-bold py-2 m-2">Shopping List</h1>
            <nav className="text-center text-lg p-1 m-1">
                <Link href="/" className="border border-black px-2 py-1 hover:bg-black hover:text-white">Home</Link>
            </nav>
            <NewItem onAddItem={handleAddItem} />
            <ItemList />
        </main>
    );
}