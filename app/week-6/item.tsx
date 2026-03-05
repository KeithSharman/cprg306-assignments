interface ItemProps {
    name: string;
    quantity: number;
    category: string;
    sortBy: "name" | "category";
}

export default function Item({ name, quantity, category, sortBy }: ItemProps) {
    return (
        <li className="bg-white border border-gray-300 rounded-lg p-4 mb-2 shadow-sm">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    {(sortBy === "name") ? (
                    <div>
                        <h3 className="font-bold">{name}</h3>
                        <p className="text-sm text-gray-600">Category: <span className="capitalize">{category}</span></p>
                    </div>
                    ) : (
                    <div>
                        <h3 className="text-sm text-gray-600">Category: <span className="capitalize">{category}</span></h3>
                        <p className="font-bold">{name}</p>
                    </div>
                    )}
                </div>
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {quantity}
                </div>
            </div>
        </li>
    );
}
