import Link from "next/link";
import { SetStateAction, useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
 
    const handleChange = (event: { target: { value: string; }; }) => {
        setName(event.target.value);
    };
 
    const [quantity, setCount] = useState(1);
 
    const handleQuantityChange = (event: { target: { value: string; }; }) => {
        setCount(parseInt(event.target.value));
    };

    const [category, setCategory] = useState("produce");
    const handleCategoryChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCategory(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!name || name.length < 2) {
            alert("Name must be at least 2 characters long and exist.");
            return;
        }
        const item = {
            name: name,
            quantity: quantity,
            category: category
        };
        console.log(item);
        alert(`name: ${name}, Quantity: ${quantity}, category: ${category}`);
        setName("");
        setCount(1);
        setCategory("produce");
        setNameTouched(false);
    };

    const [nameTouched, setNameTouched] = useState(false);
    const handleNameTouched = (event: React.FocusEvent<HTMLInputElement>) => {
        setNameTouched(true);
    };
    const handleNameFocus = () => {
        setNameTouched(false);
    };


  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-4 border-black border-2 p-4 m-4 rounded-2xl justify-content-center bg-blue-50">
      <label className=" bg-white border-black border-2 rounded-2xl p-4 justify-content-center">
        Name:
        <input onBlur={handleNameTouched} onFocus={handleNameFocus} className={nameTouched && (!name || name.length < 2) ? "border border-red-500" : "hover:border-black hover:border-2"} required type="text" placeholder="Enter your name" value={name} onChange={handleChange} />
        {nameTouched && !name ? <p className="text-red-500">input name</p> : null}
        {nameTouched && name && name.length < 2 ? <p className="text-red-500">Name must be at least 2 characters long</p> : null}
      </label>
      <label className="border-black border-2 bg-white rounded-2xl p-4 justify-content-center">
        Quantity:
        <input type="number" value={quantity} onChange={handleQuantityChange} min={1} max={99} required className="hover:border-black hover:border-2"/>
      </label>
      <label className="border-black border-2 rounded-2xl p-4 bg-white justify-content-center">
        Category:
        <select value={category} onChange={handleCategoryChange} className="hover:border-black hover:border-2">
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Meat">Meat</option>
          <option value="Frozen Foods">Frozen Foods</option>
          <option value="Canned Goods">Canned Goods</option>
          <option value="Dry Goods">Dry Goods</option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
          <option value="Household">Household</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <input disabled={!name || !category || !quantity} className="disabled:bg-gray-400 disabled:cursor-not-allowed border-black border-2 rounded-2xl p-4 justify-content-center w-30  bg-white enabled:bg-green-500" type="submit" value="Submit" />
    </form>
  );
}