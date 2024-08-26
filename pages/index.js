import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [todoItems, setTodoItem] = useState([
    {
      name: "Iron clothes",
      completed: true,
    },
  ]);

  const handleAdd = (e) => {

    if (inputValue) {
      const newItem = {
        name: inputValue,
        completed: false,
      };

      setTodoItem([...todoItems, newItem]);
      setInputValue("")
    } else {
      alert("Item name is empty.");
    }
  };

  return (
    <main
      className={` min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <h1 className=" text-2xl mb-4 text-center">Basic to-do app</h1>
      <form>
        <div className=" flex flex-col">
          <label>Item name</label>
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className=" border-blue-700 border-[1px] h-12 rounded-xl px-2 mb-2"
          />
        </div>
        <div>
          <button
            className=" p-4 px-12 bg-blue-700 rounded-xl text-white"
            type="button"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </form>

      <section className="mt-8">
        <h1 className=" text-2xl mb-4">Items</h1>
        <ul className="p-0 list-disc">
          {todoItems.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
