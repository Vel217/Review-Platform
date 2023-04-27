import Item from "@/components/commentsList/Item";
import React, { useMemo, useState } from "react";

function Index() {
  //   const [listReviews, setListReview] = useState([]);
  const listReviews = [
    {
      id: 1,
      title: "review of titanic",
      film: "titanic",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      group: "neutral",
      rating: "4",
      author: "lera",
      data: "12.04.2022",
    },
    {
      id: 2,
      title: "review of titanic",
      film: "titanic",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      group: "positive",
      rating: "4",
      author: "lera",
      data: "12.04.2022",
    },
    {
      id: 3,
      title: "review of titanic",
      film: "titanic",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      group: "positive",
      rating: "4",
      author: "lera",
      data: "12.04.2022",
    },
    {
      id: 4,
      title: "review of titanic",
      film: "titanic",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      group: "negative",
      rating: "4",
      author: "lera",
      data: "12.04.2022",
    },
    {
      id: 5,
      title: "review of titanic",
      film: "titanic",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      group: "positive",
      rating: "4",
      author: "lera",
      data: "12.04.2022",
    },
  ];

  return (
    <div className="flex  w-full justify-center">
      <ul role="list" className="space-y-3 w-1/2">
        {listReviews.map((item) => (
          <li
            key={item.id}
            className={`px-4 h-150 py-4 shadow sm:rounded-md sm:px-6 flex flex-col ${
              item.group === "neutral"
                ? "bg-slate-100"
                : item.group === "positive"
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            <h1 className="text-2xl">{item.film} </h1>
            <p>Author: {item.author}</p>
            <div className="grow flex flex-col">
              <div className="flex justify-between">
                <p>{item.title}</p>
              </div>
              <div className="border-0 h-20  rounded-md shadow p-3 my-3 bg-white">
                <p className="line-clamp-2">{item.text}</p>
              </div>
              <div className="flex justify-between">
                <div>rating{item.rating}</div>
                <div className="text-slate-600">{item.data}</div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>likes</div>
              <div>Comments</div>
              <Item />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Index;
