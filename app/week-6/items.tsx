type itemProps = {
    name: string;
    quantity: number;
    category: string;
};

export default function item ({name, quantity, category}: itemProps) {
    return (
        <li className="p-4 m-4 text-white bg-blue-400 border border-black rounded-2xl hover:bg-blue-600 text-center"> Name: {name} | Quantity: {quantity} | Category: {category} </li>
    );
}