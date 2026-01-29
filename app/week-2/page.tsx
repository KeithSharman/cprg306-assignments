import StudentInfo from "./studentInfo";
import Link from "next/link"

export default function Page() {
    return (
    <main>
      <h1>Shopping List</h1>
       <StudentInfo />
       <nav><Link href="\">Home</Link></nav>
    </main>
    )
}

