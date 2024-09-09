import React from 'react'

const FIlterControls = ({classStyle, filter, setFilter}) => {
  return (
    <div className={`bg-white dark:bg-veryDarkDesaturatedBlue text-darkGrayishBlue ${classStyle}`}>
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
  )
}

export default FIlterControls