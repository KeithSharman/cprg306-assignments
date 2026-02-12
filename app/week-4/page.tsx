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
