import Image from "next/image";

export default function TodoItem({ item, handleToggle, handleDelete }) {
  return (
    <div
      
      className="dark:bg-veryDarkDesaturatedBlue flex items-center bg-white first:rounded-t-md last:rounded-b-md h-12 p-1.5 justify-between mb-0.5"
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
  );
}
