import Link from "next/link";
import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
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
const post = {
  id: 1,
  title: "Boost your conversion rate",
  film: "titanic",
  group: "neutral",
  text: "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. NIllo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. NIllo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. NIllo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. NIllo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. NIllo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. NIllo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
  imageUrl:
    "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
  date: "Mar 16, 2020",
  author: "Michael Foster",
  rating: "4",
};

function Item() {
  const { t } = useTranslation();
  const [textarea, setTextarea] = useState("");
  // const [post, setPost] = useState('')

  return (
    <>
      <div className="flex  w-full justify-center items-center flex-col">
        <div className="mx-auto max-w-7xl px-6 py-2 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="mt-5 space-y-8 lg:mt-10 lg:space-y-10">
              <article
                key={post.id}
                className={`relative isolate flex flex-col gap-8 lg:flex-row`}
              >
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  <img
                    src={post.imageUrl !== "" ? post.imageUrl : movieFilm.src}
                    alt=""
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-x-4">
                      {" "}
                      <p className="font-semibold text-xl text-gray-900">
                        {post.author}
                      </p>
                      <p className="text-gray-500">{post.date}</p>
                      <p
                        className={`relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium ${
                          post.group === "neutral"
                            ? "bg-slate-100"
                            : post.group === "positive"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {post.group}
                      </p>
                    </div>
                    {/* ///// */}
                    <div>
                      <Link href="#">{t("comments:edit")}</Link>
                    </div>
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link href="#">
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <h1>{post.film}</h1>
                    <p className="mt-5 text-sm line-clamp-3 text-gray-600">
                      {post.text}
                    </p>
                  </div>
                  <div className="mt-6 flex border-t border-gray-900/5 pt-6 ">
                    <div className="relative flex items-center gap-x-4 shrink w-full">
                      <div className="text-sm leading-6 flex gap-5 w-full">
                        <div>
                          <button>
                            like
                            <svg
                              width="30px"
                              height="30px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.5 7C7.11024 7 6 8.11336 6 9.46667C6 10.9908 6.88166 12.6171 8.24626 14.2099C9.39162 15.5468 10.7839 16.7532 12 17.7264C13.2161 16.7532 14.6084 15.5468 15.7537 14.2099C17.1183 12.6171 18 10.9908 18 9.46667C18 8.11336 16.8898 7 15.5 7C14.1102 7 13 8.11336 13 9.46667C13 10.019 12.5523 10.4667 12 10.4667C11.4477 10.4667 11 10.019 11 9.46667C11 8.11336 9.88976 7 8.5 7ZM12 6.6587C11.1735 5.64559 9.91012 5 8.5 5C6.02376 5 4 6.99079 4 9.46667C4 11.7183 5.26747 13.807 6.72743 15.5111C8.20812 17.2395 10.0243 18.7293 11.3857 19.7891C11.747 20.0703 12.253 20.0703 12.6143 19.7891C13.9757 18.7293 15.7919 17.2395 17.2726 15.5111C18.7325 13.807 20 11.7183 20 9.46667C20 6.99079 17.9762 5 15.5 5C14.0899 5 12.8265 5.64559 12 6.6587Z"
                                fill="#000000"
                              />
                            </svg>
                          </button>
                        </div>

                        <div>
                          <button>
                            {t("comments:comments")}
                            <svg
                              fill="#000000"
                              width="30px"
                              height="30px"
                              viewBox="0 0 32 32"
                              id="Outlined"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Fill">
                                <path d="M26,12H24V6a3,3,0,0,0-3-3H6A3,3,0,0,0,3,6V24.41l5.12-5.12A1.05,1.05,0,0,1,8.83,19H12v3a3,3,0,0,0,3,3h8.17a1.05,1.05,0,0,1,.71.29L29,30.41V15A3,3,0,0,0,26,12ZM12,15v2H8.83a3,3,0,0,0-2.12.88L5,19.59V6A1,1,0,0,1,6,5H21a1,1,0,0,1,1,1v6H15A3,3,0,0,0,12,15ZM27,25.59l-1.71-1.71A3,3,0,0,0,23.17,23H15a1,1,0,0,1-1-1V15a1,1,0,0,1,1-1H26a1,1,0,0,1,1,1Z" />
                              </g>
                            </svg>
                          </button>
                        </div>
                        <div>
                          {t("myPage:rating")}: {post.rating}/5{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl ">
          <ul role="list" className="rounded-md  shadow   ">
            {listComments.map((item) => (
              <li
                key={item.id}
                className={
                  "p-4 h-150 my-5 py-2 rounded-md shadow-lg  sm:rounded-md sm:px-6 flex flex-col gap-3 bg-white"
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
                    {t("comments:delete")}
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
                          {t("comments:addComment")}
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
                            {t("comments:postComment")}
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
      </div>
    </>
  );
}

export default Item;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["comments", "common"])),
    },
  };
}
