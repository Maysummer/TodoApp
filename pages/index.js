import { useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import ThemeSwitch from "@/components/ThemeSwitcher";
import TodoAddForm from "@/components/TodoAddForm";
import TodoItem from "@/components/TodoItem";
import FilterControls from "@/components/FIlterControls";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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
        console.log({ todoItems });
        setTodoItems([...todoItems, newItem]);
        setInputValue("");
      } else {
        alert("Item name is empty.");
      }
    }
  };

  const handleToggle = (id) => {
    console.log({ todoItems });
    setTodoItems((prevTodoItems) =>
      prevTodoItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDelete = (id) => {
    console.log({ todoItems });
    setTodoItems((prevItems) => prevItems.filter((todo) => todo.id !== id));
  };

  const incompleteCount = todoItems.filter((todo) => !todo.completed).length;

  const clearCompletedTodos = () => {
    console.log({ todoItems });
    setTodoItems((prevItems) => prevItems.filter((todo) => !todo.completed));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    console.log({ todoItems });
    setTodoItems((prevItems) => {
      const updatedItems = [...prevItems]; // Create a true copy of the array
      const [reorderedItem] = updatedItems.splice(result.source.index, 1);
      updatedItems.splice(result.destination.index, 0, reorderedItem);
      console.log("1 Updated todoItems:", todoItems);

      return updatedItems; // Return a new array
    });
    console.log("2 Updated todoItems:", todoItems);
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    console.log({ savedTodos });
    console.log({ todoItems });
    if (savedTodos) {
      console.log("saved");
      setTodoItems(savedTodos);
      console.log({ todoItems });
    }
    console.log({ todoItems });
  }, []);

  useEffect(() => {
    console.log({ todoItems });
    console.log("set");
    localStorage.setItem("todos", JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <main
      className={`bg-[url(/assets/images/bg-mobile-light.jpg)] dark:bg-[url(/assets/images/bg-mobile-dark.jpg)] largerScreen:bg-[url(/assets/images/bg-desktop-light.jpg)] largerScreen:dark:bg-[url(/assets/images/bg-desktop-dark.jpg)]  bg-no-repeat bg-auto largerScreen:bg-[length:100%_300px] w-full min-h-screen flex-col items-center ${josefinSans.className} dark:bg-veryDarkBlue flex`}
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
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="droppable-1">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {filteredTodos.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={`${item.id}`}
                        index={index}
                        className=""
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="border-none first:rounded-t-md last:rounded-b-md"
                          >
                            <TodoItem
                              item={item}
                              handleToggle={handleToggle}
                              handleDelete={handleDelete}
                              key={index}
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

            <div className="bg-white dark:bg-veryDarkDesaturatedBlue first:rounded-t-md last:rounded-b-md h-12 text-lightGrayishBlue flex justify-between items-center pl-5 pr-5">
              <p>
                {incompleteCount} item{incompleteCount === 1 ? "" : "s"} left
              </p>
              <FilterControls
                classStyle="sm:flex gap-3 hidden"
                filter={filter}
                setFilter={setFilter}
              />
              <p onClick={clearCompletedTodos} className="cursor-pointer">
                Clear Completed
              </p>
            </div>
          </ul>
          <FilterControls
            classStyle="rounded-md h-12 flex justify-center items-center mt-4 sm:hidden"
            filter={filter}
            setFilter={setFilter}
          />
        </section>
      </div>
    </main>
  );
}
