import { useCallback, useEffect, useMemo, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import ThemeSwitch from "@/components/ThemeSwitcher";
import TodoAddForm from "@/components/TodoAddForm";
import TodoItem from "@/components/TodoItem";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TodosFilterControls from "@/components/TodosFilterControls";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [filter, setFilter] = useState("all");

  const setLocalStorage = useCallback((items) => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, []);

  const filteredTodos = useMemo(() => {
    if (filter === "completed") {
      return todoItems.filter((todo) => todo.completed);
    } else if (filter === "active") {
      return todoItems.filter((todo) => !todo.completed);
    }
    return todoItems;
  }, [filter, todoItems]);

  const handleAdd = useCallback(
    (e) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        let todoId = todoItems.length
          ? Math.max(...todoItems.map((todo) => todo.id)) + 1
          : 0;
        const newItem = {
          id: todoId,
          name: inputValue,
          completed: false,
        };
        const updatedTodos = [...todoItems, newItem];
        setTodoItems(updatedTodos);
        setLocalStorage(updatedTodos);
        setInputValue("");
      } else if (e.key === "Enter" && !inputValue.trim()) {
        alert("Item name is empty.");
      }
    },
    [inputValue, todoItems, setLocalStorage]
  );

  const handleToggle = useCallback(
    (id) => {
      const updatedTodos = todoItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      setTodoItems(updatedTodos);
      setLocalStorage(updatedTodos);
    },
    [todoItems, setLocalStorage]
  );

  const handleDelete = useCallback(
    (id) => {
      const updatedTodos = todoItems.filter((todo) => todo.id !== id);
      setTodoItems(updatedTodos);
      setLocalStorage(updatedTodos);
    },
    [todoItems, setLocalStorage]
  );

  const clearCompletedTodos = useCallback(() => {
    const activeTodos = todoItems.filter((todo) => !todo.completed);
    setTodoItems(activeTodos);
    setLocalStorage(activeTodos);
  }, [todoItems, setLocalStorage]);

  const handleOnDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      const updatedTodos = [...todoItems];
      const [reorderedTodo] = updatedTodos.splice(result.source.index, 1);
      updatedTodos.splice(result.destination.index, 0, reorderedTodo);
      setTodoItems(updatedTodos);
      setLocalStorage(updatedTodos);
    },
    [todoItems, setLocalStorage]
  );

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodoItems(savedTodos);
  }, []);

  const incompleteCount = useMemo(
    () => todoItems.filter((todo) => !todo.completed).length,
    [todoItems]
  );

  return (
    <main
      className={`bg-[url(/assets/images/bg-mobile-light.jpg)] dark:bg-[url(/assets/images/bg-mobile-dark.jpg)] largerScreen:bg-[url(/assets/images/bg-desktop-light.jpg)] largerScreen:dark:bg-[url(/assets/images/bg-desktop-dark.jpg)]  bg-no-repeat bg-auto largerScreen:bg-[length:100%_300px] w-full min-h-screen flex-col items-center ${josefinSans.className} dark:bg-veryDarkBlue flex`}
    >
      <div className="w-10/12 sm:w-8/12 md:w-6/12">
        <header className="flex justify-between items-center py-10 largerScreen:py-20">
          <h1 className="text-2xl largerScreen:text-4xl font-bold tracking-[10px] ml-1 text-veryLightGray">
            TODO
          </h1>
          <ThemeSwitch />
        </header>

        <TodoAddForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleAdd={handleAdd}
        />

        <section className="text-sm">
          <ul className="shadow-3xl">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="droppable-1">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {filteredTodos.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={`${item.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TodoItem
                              item={item}
                              handleToggle={handleToggle}
                              handleDelete={handleDelete}
                              index={index}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <div
              className={`bg-white dark:bg-veryDarkDesaturatedBlue ${
                filteredTodos.length === 0
                  ? "rounded-t-md rounded-b-md"
                  : "rounded-b-md"
              } h-12 text-lightGrayishBlueL dark:text-veryDarkGrayishBlue1 flex justify-between items-center pl-5 pr-5`}
            >
              <p>
                {incompleteCount} item{incompleteCount === 1 ? "" : "s"} left
              </p>
              <TodosFilterControls
                classStyle="sm:flex gap-3 hidden"
                filter={filter}
                setFilter={setFilter}
              />
              <p
                onClick={clearCompletedTodos}
                className="cursor-pointer hover:text-veryDarkGrayishBlue1 dark:hover:text-lightGrayishBlueD"
              >
                Clear Completed
              </p>
            </div>
          </ul>

          <TodosFilterControls
            classStyle="rounded-md h-12 flex justify-center gap-6 items-center mt-4 sm:hidden shadow-3xl"
            filter={filter}
            setFilter={setFilter}
          />
        </section>
        <footer>
          <p className="text-[#a4a4a6] dark:text-[#535471] flex justify-center mt-12 text-sm">
            Drag and drop to reorder list
          </p>
        </footer>
      </div>
    </main>
  );
}
