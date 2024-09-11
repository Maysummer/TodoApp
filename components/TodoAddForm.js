import React from "react";

const TodoAddForm = ({ inputValue, setInputValue, handleAdd }) => {
  return (
    <form>
      <div className="relative">
        <div className="w-5 h-5 absolute bottom-1/2 left-5 rounded-full border-2 dark:border-veryDarkGrayishBlue2"></div>
        <input
          value={inputValue}
          placeholder="Create a new todo..."
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => handleAdd(e)}
          className="h-12 dark:bg-veryDarkDesaturatedBlue indent-11 rounded-md focus:outline-none p-1.5 mb-4 w-full placeholder:text-xs dark:placeholder:text-darkGrayishBlue"
        />
      </div>
    </form>
  );
};

export default TodoAddForm;
