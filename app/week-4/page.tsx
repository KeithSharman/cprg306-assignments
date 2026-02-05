"use client";
import NewItem from "./new-item";
import Link from "next/link";

import { SetStateAction, useState } from "react";

export default function Page() {
    return(
        <main>
            <nav className="text-center text-lg p-1 m-1"><Link href="/" className="border border-black px-2 py-1 hover:bg-black hover:text-white">Home</Link></nav>
            <NewItem />
        </main>
    );
}

export function Form() {
  const [name, setName] = useState("");
 
    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
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
        alert(`Item State: ${name}, ${quantity}, ${category}`);
        setName("");
        setCount(1);
        setCategory("produce");
    };

    const [nameTouched, setNameTouched] = useState(false);
    const handleNameTouched = () => {
        setNameTouched(true);
    };

  return (
    <form onSubmit={handleSubmit} >
      <label>
        Name:
        <input onBlur={handleNameTouched} className={nameTouched ? "border border-red-500" : ""} required type="text" placeholder="Enter your name" value={name} onChange={handleChange} />
        {(nameTouched && !name) ? <p className="text-red-500">Name is required</p> : null}
      </label>
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={handleQuantityChange} min={1} max={99} required/>
      </label>
      <label>
        Category:
        <select value={category} onChange={handleCategoryChange}>
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
      <input disabled={!name || !category || !quantity} className="disabled:bg-gray-400 disabled:cursor-not-allowed" type="submit" value="Submit" />
    </form>
  );
}