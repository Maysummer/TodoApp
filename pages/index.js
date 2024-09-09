import { useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import ThemeSwitch from "@/components/ThemeSwitcher";

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
      let taskId = 0;
      todoItems.forEach((task) => {
        taskId = Math.max(taskId, task.id + 1);
        return taskId;
      });
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

  const incomplete = () => {
    return todoItems.filter((todo) => !todo.completed).length;
  };

  const clearCompletedTodos = () => {
    setTodoItems((prevItems) => prevItems.filter((todo) => !todo.completed));
  };

  const handleCurrView = () => {
    if (filter === "all") {
    }
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      setTodoItems(savedTodos);
    }
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

        <form>
          <div className="relative">
            <div className="w-5 h-5 absolute bottom-1/2 left-5 rounded-full border"></div>
            <input
              value={inputValue}
              placeholder="Create a new todo..."
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => handleAdd(e)}
              className="h-12 dark:bg-veryDarkDesaturatedBlue indent-11 rounded-md focus:outline-none p-1.5 mb-4 w-full placeholder:text-sm"
            />
          </div>
        </form>

        <section className="text-sm">
          <ul>
            {filteredTodos.map((item, index) => (
              <div
                key={index}
                className="dark:bg-veryDarkDesaturatedBlue flex items-center bg-white first:rounded-t-md last:rounded-b-md h-12 p-1.5 justify-between mb-0.5"
              >
                <div className="ml-3.5">
                  <input
                    type="checkbox"
                    name={item.name}
                    id=""
                    key={index}
                    className="hidden"
                  />
                  <label
                    htmlFor={item.name}
                    className={`flex items-center gap-2.5 ${
                      item.completed
                        ? "line-through text-darkGrayishBlue"
                        : "no-underline"
                    }`}
                  >
                    <span
                      className={`flex w-5 h-5 rounded-full border justify-center items-center ${
                        item.completed
                          ? "bg-gradient-to-br from-gradBlue to-gradPurple"
                          : ""
                      }`}
                      onClick={() => handleToggle(item.id)}
                    >
                      {item.completed && (
                        <Image
                          src="/assets/icons/check.svg"
                          alt="check mark"
                          width={11}
                          height={9}
                        ></Image>
                      )}
                    </span>
                    <span>{item.name}</span>
                  </label>
                </div>

                <Image
                  alt="delete icon"
                  src="/assets/icons/cross.svg"
                  width={13}
                  height={13}
                  onClick={() => handleDelete(item.id)}
                  className="mr-3.5"
                />
              </div>
            ))}
            <div className="bg-white dark:bg-veryDarkDesaturatedBlue first:rounded-t-md last:rounded-b-md h-12 text-lightGrayishBlue flex justify-between items-center pl-5 pr-5">
              <p>
                {incomplete()} item{incomplete() === 1 ? "" : "s"} left
              </p>
              <div className="bg-white dark:bg-veryDarkDesaturatedBlue sm:flex gap-3 text-darkGrayishBlue hidden">
                <b
                  className={`cursor-pointer ${
                    filter === "all"
                      ? "bg-gradient-to-br from-gradBlue to-gradPurple bg-clip-text text-transparent"
                      : ""
                  }`}
                  onClick={() => setFilter("all")}
                >
                  All
                </b>
                <b
                  className={`cursor-pointer ${
                    filter === "active"
                      ? "bg-gradient-to-br from-gradBlue to-gradPurple bg-clip-text text-transparent"
                      : ""
                  }`}
                  onClick={() => setFilter("active")}
                >
                  Active
                </b>
                <b
                  className={`cursor-pointer ${
                    filter === "completed"
                      ? "bg-gradient-to-br from-gradBlue to-gradPurple bg-clip-text text-transparent"
                      : ""
                  }`}
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </b>
              </div>
              <p onClick={clearCompletedTodos} className="cursor-pointer">
                Clear Completed
              </p>
            </div>
          </ul>
          <div className="bg-white dark:bg-veryDarkDesaturatedBlue rounded-md pl-20 pr-20 h-12 flex justify-between items-center text-darkGrayishBlue mt-4 sm:hidden">
            <b
              className={`cursor-pointer ${
                filter === "all"
                  ? "bg-gradient-to-br from-gradBlue to-gradPurple bg-clip-text text-transparent"
                  : ""
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </b>
            <b
              className={`cursor-pointer ${
                filter === "active"
                  ? "bg-gradient-to-br from-gradBlue to-gradPurple bg-clip-text text-transparent"
                  : ""
              }`}
              onClick={() => setFilter("active")}
            >
              Active
            </b>
            <b
              className={`cursor-pointer ${
                filter === "completed"
                  ? "bg-gradient-to-br from-gradBlue to-gradPurple bg-clip-text text-transparent"
                  : ""
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </b>
          </div>
        </section>
      </div>
    </main>
  );
}
