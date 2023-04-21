import React from "react";

function NewFilm() {
  return (
    <>
      <div className="flex flex-col  mt-5 w-full items-center mb-5">
        <h2 className="text-base text-center font-semibold leading-7 ">
          ADD new film
        </h2>
        <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3 rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6 font-bold">Name of movie</div>
          <div className=" flex gap-5 px-4 py-5 sm:p-6 ">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3 rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6 font-bold">Year of movie</div>
          <div className=" flex gap-5 px-4 py-5 sm:p-6 ">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3 rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6 font-bold">Director of movie</div>
          <div className=" flex gap-5 px-4 py-5 sm:p-6 ">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button
          type="button"
          className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          ADD
        </button>
      </div>
    </>
  );
}

export default NewFilm;
