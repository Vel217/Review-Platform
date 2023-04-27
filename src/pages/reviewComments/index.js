import React, { useState } from "react";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const listComments = [
  {
    id: 1,
    userName: "Popka",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    data: "12.04.2022",
  },
  {
    id: 2,
    userName: "Popka",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    data: "12.04.2022",
  },
  {
    id: 3,
    userName: "Popka",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    data: "12.04.2022",
  },
];

function Item() {
  const [textarea, setTextarea] = useState("");
  // const [review, setReview] = useState('')
  const item = {
    id: 1,
    title: "review of titanic",
    film: "titanic",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    group: "positive",
    rating: "4",
    author: "lera",
    data: "12.04.2022",
  };

  return (
    <>
      <div className="flex  w-full justify-center items-center flex-col">
        <div
          className={`px-4 h-auto flex  w-2/3 lg:w-2/3 py-4 shadow sm:rounded-md sm:px-6 flex-col my-3 ${
            item.group === "neutral"
              ? "bg-slate-100"
              : item.group === "positive"
              ? "bg-green-100"
              : "bg-red-100"
          }`}
        >
          <h1 className="text-2xl">{item.film} film </h1>
          <p>Author: {item.author}</p>
          <div className="grow flex flex-col">
            <div className="flex justify-between">
              <p>{item.title}title</p>
            </div>
            <div className="border-0 h-auto  rounded-md shadow p-3 my-3 bg-white">
              <p className="h-auto">{item.text}text</p>
            </div>
            <div className="flex justify-between">
              <div>rating{item.rating}</div>
              <div className="text-slate-600">{item.data} data</div>
            </div>
          </div>
          <div className="flex justify-between"></div>
        </div>
        <ul
          role="list"
          className="border border-1 rounded-md  shadow p-2 space-y-3 w-2/3 lg:w-2/3   p-5"
        >
          {listComments.map((item) => (
            <li
              key={item.id}
              className={
                "p-4 h-150 mb-4 shadow sm:rounded-md sm:px-6 flex flex-col gap-3 bg-white"
              }
            >
              <div className="flex justify-start justify-items-end gap-5">
                <p className="font-bold">{item.userName}</p>
                <p className="text-slate-400 ">{item.data}</p>
              </div>
              <p className="text-slate-500 ">{item.text}</p>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="  rounded-md bg-red-100 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          <div className="p-4  mb-4 shadow sm:rounded-md sm:px-6 mt-2 bg-white">
            <div className="">
              <div className="flex items-start space-x-4">
                <div className="min-w-0 flex-1 ">
                  <div className="relative">
                    <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                      <label htmlFor="comment" className="sr-only">
                        Add your comment
                      </label>
                      <textarea
                        rows={3}
                        className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Add your comment..."
                        defaultValue={""}
                        onChange={(ev) => setTextarea(ev.target.value)}
                      />
                    </div>

                    <div className=" flex justify-between py-2 pl-3 pr-2">
                      <div className="flex items-center space-x-5"></div>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Post comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Item;
