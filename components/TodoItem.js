import Image from "next/image";

export default function TodoItem({ index, item, handleToggle, handleDelete }) {
  return (
    <div
      className={`dark:bg-veryDarkDesaturatedBlue bg-white flex items-center h-12 p-1.5 justify-between border-b-2 border-veryLightGrayishBlue dark:border-veryDarkGrayishBlue2 font-bold text-xs largerScreen:text-sm ${
        index === 0 ? "rounded-t-md" : ""
      }`}
    >
      <div className="ml-3.5">
        <input
          type="checkbox"
          name={item.name}
          id={item.id}
          className="hidden"
        />
        <label
          htmlFor={item.name}
          className={`flex items-center gap-2.5 ${
            item.completed
              ? "line-through text-lightGrayishBlueL dark:text-veryDarkGrayishBlue1"
              : "no-underline text-veryDarkGrayishBlue1 dark:text-lightGrayishBlueD"
          }`}
        >
          <span
            className={`flex w-5 h-5 rounded-full justify-center items-center ${
              item.completed
                ? "bg-gradient-to-br from-gradBlue to-gradPurple"
                : "border-2 dark:border-veryDarkGrayishBlue2  hover:border-none hover:bg-gradient-to-br hover:from-gradBlue hover:to-gradPurple hover:p-[1px]"
            }`}
            onClick={() => handleToggle(item.id)}
          >
            {!item.completed && <span className="flex w-[calc(100%-1px)] h-[calc(100%-1px)] bg-white dark:bg-veryDarkDesaturatedBlue rounded-full"></span>}
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
  );
}
