import Link from "next/link";
import ItemList from "./item-list";

export default function Page() {
    return(
        <main>
        <h1 className="text-center text-xl font-bold py-2 m-2">Shopping List</h1>
        <nav className="text-center text-lg p-1 m-1"><Link href="/" className="border border-black px-2 py-1 hover:bg-black hover:text-white">Home</Link></nav>
        <ItemList />
        </main>
    );
}