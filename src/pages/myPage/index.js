import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import movieFilm from "../../../public/assets/images/movie-film2.png";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import parseLinks from "@/components/parseLink";
import prisma from "@/lib/prisma";
import { useRouter } from "next/router";

function MyPage(props) {
  const { data: session } = useSession();
  // const [userId, setUserId] = useState(session?.user.id);
  const [userId, setUserId] = useState("clhc83zgp0000lc09djw31scg");
  const { t } = useTranslation();
  const [listReviews, setListReview] = useState(props.serializedReviews);

  const router = useRouter();
  return (
    <>
      <h1 className="text-center">{t("myPage:myRev")}</h1>

      <div className="flex flex-col w-full  justify-center bg-white">
        <div className="w-screen px-6 mx-auto divide-y divide-gray-200 overflow-hidden  flex justify-between  rounded-lg bg-white shadow">
          <button
            onClick={() => router.push(`/newReview`)}
            className="mb-2 rounded-full bg-gray-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 "
          >
            {t("myPage:create")}
          </button>
          <div> {session?.user.name}</div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="mt-5 space-y-8 lg:mt-10 lg:space-y-10">
              {listReviews
                .filter((post) => post.authorId === userId)
                .map((post) => (
                  <article
                    onClick={() => router.push(`/reviewPost?postId=${post.id}`)}
                    key={post.id}
                    className={`relative isolate flex flex-col gap-8 lg:flex-row`}
                  >
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
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-x-4">
                          {" "}
                          <p className="font-semibold text-xl text-gray-900">
                            {post.author.name}
                          </p>
                          <p className="text-gray-500">{post.createdAt}</p>
                          <p
                            className={`relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium ${
                              post.category === "neutral"
                                ? "bg-slate-100"
                                : post.category === "positive"
                                ? "bg-green-100"
                                : "bg-red-100"
                            }`}
                          >
                            {post.category}
                          </p>
                        </div>

                        <div className="relative z-10 rounded-full  px-3 py-1.5 font-medium bg-green-300">
                          <button
                            onClick={() =>
                              router.push(
                                `/newReview?edit=true&postId=${post.id}`
                              )
                            }
                          ></button>{" "}
                          {t("myPage:edit")}
                        </div>
                      </div>
                      <div className="group relative max-w-xl">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <button
                            onClick={() =>
                              router.push(`/reviewPost?postId=${post.id}`)
                            }
                          >
                            <span className="absolute inset-0" />
                            {post.reviewName}
                          </button>
                        </h3>
                        <h1>{post.film.title}</h1>
                        <div className="mt-5 text-sm line-clamp-3 text-gray-600">
                          <ReactMarkdown>{post.content}</ReactMarkdown>
                        </div>
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
                              {t("myPage:rating")}: {post.stars}/10{" "}
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
    </>
  );
}

export default MyPage;

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
      Comment: {
        select: {
          id: true,
        },
      },
      Rating: {
        select: {
          stars: true,
        },
      },

      Like: {
        select: {
          id: true,
        },
      },
    },
  });

  const serializedReviews = reviews.map((review) => ({
    ...review,
    createdAt: review.createdAt.toISOString(),
  }));
  console.log("serializedReviews", serializedReviews);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["myPage", "common"])),
      serializedReviews,
    },
  };
}
