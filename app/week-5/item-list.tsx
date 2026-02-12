'use client';

import { useState } from "react";
import Item from "./item";
import items from "./items.json";

interface ItemInterface {
    id: string;
    name: string;
    quantity: number;
    category: string;
}

export default function ItemList() {
    const [sortBy, setSortBy] = useState<"name" | "category">("name");
    const [groupByCategory, setGroupByCategory] = useState(false);

    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else {
            return a.category.localeCompare(b.category);
        }
    });

    const groupedItems = items.reduce((accumulator: Record<string, ItemInterface[]>, item: ItemInterface) => {
        if (!accumulator[item.category]) {
            accumulator[item.category] = [];
        }
        accumulator[item.category].push(item);
        return accumulator;
    }, {});

    const sortedCategories = Object.keys(groupedItems).sort();
    sortedCategories.forEach((category) => {
        groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    return (
        <div className="p-4">
            <div className="flex gap-2 mb-4">
                <button 
                    onClick={() => setSortBy("name")} 
                    className={`px-4 py-2 rounded font-semibold ${ 
                        sortBy === "name" ? "bg-blue-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}
                    >Sort by Name
                    </button>
                <button
                    onClick={() => setSortBy("category")}
                    className={`px-4 py-2 rounded font-semibold ${
                        sortBy === "category" ? "bg-blue-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}
                    >Sort by Category
                </button>
                <button
                    onClick={() => setGroupByCategory(!groupByCategory)}
                    className={`px-4 py-2 rounded font-semibold ${
                        groupByCategory ? "bg-green-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}
                    >Group by Category
                </button>
            </div>

            {groupByCategory ? (
                <div>
                    {sortedCategories.map((category) => (
                        <div key={category} className="mb-6">
                            <h2 className="text-lg font-bold capitalize mb-2 text-gray-700">
                                {category}
                            </h2>
                            <ul>
                                {groupedItems[category].map((item) => (
                                    <Item
                                        key={item.id}
                                        name={item.name}
                                        quantity={item.quantity}
                                        category={item.category}
                                        sortBy={sortBy}
                                    />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <ul>
                    {sortedItems.map((item) => (
                        <Item
                            key={item.id}
                            name={item.name}
                            quantity={item.quantity}
                            category={item.category}
                            sortBy={sortBy}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}