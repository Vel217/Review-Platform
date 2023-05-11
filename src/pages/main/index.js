import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import parseLinks from "@/components/parseLink";
import movieFilm from "../../../public/assets/images/movie-film2.png";

import ReactMarkdown from "react-markdown";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { useRouter } from "next/router";

function Index(props) {
  const [listReviews, setListReview] = useState(props.serializedReviews);
  const router = useRouter();

  const { t } = useTranslation();
  useEffect(() => {});

  function sortPosts(option) {
    if (option === "date") {
      const posts = listReviews.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setListReview(posts);
    } else {
      const posts = listReviews.sort((a, b) => b.stars - a.start);
      setListReview(posts);
    }
  }

  return (
    <div className="flex  w-full  justify-center bg-white">
      <div className="bg-white ">
        <div className="w-screen px-6 mx-auto divide-y divide-gray-200 overflow-hidden  flex justify-start  rounded-lg bg-white shadow">
          <select
            name="sortedPost"
            onChange={(ev) => {
              sortPosts(ev.target.value);
            }}
            defaultValue="date"
            className="mb-2 block mt-2 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="date">{t("main:best")}</option>
            <option value="rating">{t("main:new")}</option>
          </select>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="mt-5 space-y-8 lg:mt-10 lg:space-y-10">
              {listReviews.map((post) => (
                <article
                  onClickCapture={() =>
                    router.push(`/reviewPost?postId=${post.id}`)
                  }
                  key={post.id}
                  onClick={() => {
                    router.push(`/reviewPost?postId=${post.id}`);
                  }}
                  className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 px-5"
                >
                  <div>
                    <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                      {parseLinks(post.imageUrl) === null ? (
                        <img
                          src={movieFilm.src}
                          alt=""
                          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                        />
                      ) : (
                        <img
                          src={parseLinks(post.imageUrl)[0]}
                          alt=""
                          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                        />
                      )}
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>

                  <div className="lg:col-span-2 mt-10 px-5  sm:mt-16 sm:px-0 lg:mt-0">
                    <div className="flex items-center gap-x-4 text-xs">
                      <p className="font-semibold text-xl text-gray-900">
                        {post.author.name}
                      </p>
                      <div
                        className={`relative z-10 rounded-full text-sm bg-gray-50 px-3 py-1.5 font-medium ${
                          post.category === "neutral"
                            ? "bg-slate-100"
                            : post.category === "positive"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {post.category}
                      </div>

                      <p className="text-gray-500">
                        {format(new Date(post.createdAt), "dd/MM/yy")}
                      </p>
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <button
                          onClick={() =>
                            router.push(`/reviewPost?postId=${post.id}`)
                          }
                        >
                          {post.reviewName}
                        </button>
                      </h3>
                      <h1>{post.film.title}</h1>
                      <div className="mt-5 text-sm line-clamp-3 text-gray-600">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                      </div>
                    </div>
                    <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                      <div className="relative flex items-center gap-x-4">
                        <div className="text-sm leading-6 flex gap-5">
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
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8.5 7C7.11024 7 6 8.11336 6 9.46667C6 10.9908 6.88166 12.6171 8.24626 14.2099C9.39162 15.5468 10.7839 16.7532 12 17.7264C13.2161 16.7532 14.6084 15.5468 15.7537 14.2099C17.1183 12.6171 18 10.9908 18 9.46667C18 8.11336 16.8898 7 15.5 7C14.1102 7 13 8.11336 13 9.46667C13 10.019 12.5523 10.4667 12 10.4667C11.4477 10.4667 11 10.019 11 9.46667C11 8.11336 9.88976 7 8.5 7ZM12 6.6587C11.1735 5.64559 9.91012 5 8.5 5C6.02376 5 4 6.99079 4 9.46667C4 11.7183 5.26747 13.807 6.72743 15.5111C8.20812 17.2395 10.0243 18.7293 11.3857 19.7891C11.747 20.0703 12.253 20.0703 12.6143 19.7891C13.9757 18.7293 15.7919 17.2395 17.2726 15.5111C18.7325 13.807 20 11.7183 20 9.46667C20 6.99079 17.9762 5 15.5 5C14.0899 5 12.8265 5.64559 12 6.6587Z"
                                  fill="#000000"
                                />
                              </svg>
                            </button>
                          </div>

                          <div>
                            <button>
                              comments
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
                            {t("main:rating")}: {post.stars}/5{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;

export async function getServerSideProps({ locale }) {
  const reviews = await prisma.review.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
      film: {
        select: {
          title: true,
        },
      },
    },
  });

  const serializedReviews = reviews.map((review) => ({
    ...review,
    createdAt: review.createdAt.toISOString(),
  }));

  return {
    props: {
      ...(await serverSideTranslations(locale, ["main", "common"])),
      serializedReviews,
    },
  };
}
