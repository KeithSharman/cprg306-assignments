interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  sortBy: "name" | "category";
  onSelect?: (item: { name: string; quantity: number; category: string }) => void;
}

export default function Item({
  name,
  quantity,
  category,
  sortBy,
  onSelect,
}: ItemProps) {
  const handleSelect = () => {
    if (onSelect) onSelect({ name, quantity, category });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleSelect();
    }
  };

  return (
    <li
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="bg-white border border-gray-300 rounded-lg p-4 mb-2 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {sortBy === "name" ? (
            <div>
              <h3 className="font-bold">{name}</h3>
              <p className="text-sm text-gray-600">
                Category: <span className="capitalize">{category}</span>
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-sm text-gray-600">
                Category: <span className="capitalize">{category}</span>
              </h3>
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