import React from "react";

const TodosFilterControls = ({ classStyle, filter, setFilter }) => {
  return (
    <div
      className={`bg-white dark:bg-veryDarkDesaturatedBlue text-[#a4a4a6] dark:text-[#535471] font-bold ${classStyle}`}
    >
      <p
        className={`cursor-pointer hover:text-veryDarkGrayishBlue1 dark:hover:text-lightGrayishBlueD ${
          filter === "all"
            ? "bg-gradient-to-br from-gradBlue to-gradPurple bg-clip-text text-transparent"
            : ""
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </p>
      <p
        className={`cursor-pointer hover:text-veryDarkGrayishBlue1 dark:hover:text-lightGrayishBlueD ${
          filter === "active"
            ? "bg-gradient-to-br from-gradBlue to-gradPurple bg-clip-text text-transparent"
            : ""
        }`}
        onClick={() => setFilter("active")}
      >
        Active
      </p>
      <p
        className={`cursor-pointer hover:text-veryDarkGrayishBlue1 dark:hover:text-lightGrayishBlueD ${
          filter === "completed"
            ? "bg-gradient-to-br from-gradBlue to-gradPurple bg-clip-text text-transparent"
            : ""
        }`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </p>
    </div>
  );
};

export default TodosFilterControls;
