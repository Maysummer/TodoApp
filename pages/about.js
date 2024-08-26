// import ListItem from "@/components/list-item";
import ListItem from "../components/list-item"
import { useState } from "react";

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);

  const employees = [
    {
      name: "Bolu",
      age: 24,
      year: "2001",
    },
    {
      name: "Emmanuel",
      age: 26,
      year: "2002",
    },
    {
      name: "Titi",
      age: 27,
      year: "2003",
    },
  ];

  return (
    <div className=" p-8">
      <div className="mb-8">
        <h1>About us page</h1>
        <button
          className=" bg-slate-400"
          onClick={() => setIsLoading(!isLoading)}
        >
          Toggle state
        </button>
      </div>

      <p className=" text-yellow-200 mb-8">
        {isLoading ? "Loading Employees" : "Loaded"}
      </p>

      {!isLoading && (
        <ul id="list">
          {employees.map((e, i) => (
            <ListItem key={i} item={e} />
          ))}
        </ul>
      )}
    </div>
  );
}
