import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function HandlingInputs() {
  const [inputValue, setInputValue] = useState()

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <form>
        <input
          value={inputValue}
          onChange={(e) => {
            // console.log(e.target.value);
            setInputValue(e.target.value);
          }}
          className=" border-blue-700 border-[1px] h-12 rounded-xl px-2"
        />

        <p className=" mt-4">Hi, my name is {inputValue}</p>
      </form>
    </main>
  );
}
