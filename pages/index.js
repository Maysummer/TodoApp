import { useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import ThemeSwitch from "@/components/ThemeSwitcher";
import TodoAddForm from "@/components/TodoAddForm";
import TodoItem from "@/components/TodoItem";
import FIlterControls from "@/components/FIlterControls";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [filter, setFilter] = useState("all");

  const filteredTodos = todoItems.filter((todo) => {
    if (filter === "completed") return todo.completed;
    else if (filter === "active") return !todo.completed;
    return true;
  });

  const handleAdd = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let taskId = todoItems.length
        ? Math.max(...todoItems.map((todo) => todo.id)) + 1
        : 0;
      if (inputValue) {
        const newItem = {
          id: taskId,
          name: inputValue,
          completed: false,
        };
        setTodoItems([...todoItems, newItem]);
        setInputValue("");
      } else {
        alert("Item name is empty.");
      }
    }
  };

  const handleToggle = (id) => {
    setTodoItems((prevTodoItems) =>
      prevTodoItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDelete = (id) => {
    setTodoItems((prevItems) => prevItems.filter((todo) => todo.id !== id));
  };

  const incompleteCount = todoItems.filter((todo) => !todo.completed).length;

  const clearCompletedTodos = () => {
    setTodoItems((prevItems) => prevItems.filter((todo) => !todo.completed));
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) setTodoItems(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <main
      className={`bg-[url(/assets/images/bg-mobile-light.jpg)] dark:bg-[url(/assets/images/bg-mobile-dark.jpg)] largerScreen:bg-[url(/assets/images/bg-desktop-light.jpg)] largerScreen:dark:bg-[url(/assets/images/bg-desktop-dark.jpg)]  bg-no-repeat bg-auto min-h-screen flex-col items-center ${josefinSans.className} dark:bg-veryDarkBlue flex`}
    >
      <div className="w-10/12 sm:w-8/12 md:w-6/12">
        <div className="flex justify-between items-center py-10 largerScreen:py-20">
          <h1 className="text-2xl largerScreen:text-4xl font-bold tracking-[10px] ml-1 text-veryLightGray">
            TODO
          </h1>
          <ThemeSwitch />
        </div>
        <TodoAddForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleAdd={handleAdd}
        />

        <section className="text-sm">
          <ul>
            {filteredTodos.map((item, index) => (
              <TodoItem
                item={item}
                handleToggle={handleToggle}
                handleDelete={handleDelete}
                key={index}
              />
            ))}
            <div className="bg-white dark:bg-veryDarkDesaturatedBlue first:rounded-t-md last:rounded-b-md h-12 text-lightGrayishBlue flex justify-between items-center pl-5 pr-5">
              <p>
                {incompleteCount} item{incompleteCount === 1 ? "" : "s"} left
              </p>
              <FIlterControls
                classStyle="sm:flex gap-3 hidden"
                filter={filter}
                setFilter={setFilter}
              />
              <p onClick={clearCompletedTodos} className="cursor-pointer">
                Clear Completed
              </p>
            </div>
          </ul>
          <FIlterControls
            classStyle="rounded-md pl-20 pr-20 h-12 flex justify-between items-center mt-4 sm:hidden"
            filter={filter}
            setFilter={setFilter}
          />
        </section>
      </div>
    </main>
  );
}
