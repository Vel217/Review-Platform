import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useState, useCallback } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { HeartIcon } from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import { Tab } from "@headlessui/react";
import { useSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import parseLinks from "@/components/parseLink";
import movieFilm from "../../../public/assets/images/movie-film2.png";
import { format } from "date-fns";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Item({
  serializedPost,
  serializedLikeOnPost,
  serializedCommentsOnPost,
  serializedRatingsOnPost,
  queryId,
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [userId, setUserId] = useState(session?.user.id);
  // const [userId, setUserId] = useState("clhc83zgp0000lc09djw31scg");
  const { t } = useTranslation();
  const [textarea, setTextarea] = useState("");
  const [ratingList, setRatingList] = useState(serializedRatingsOnPost);
  const [averageRating, setAverageRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(undefined);

  const [likePost, setLikePost] = useState(undefined);
  const [likesOnPost, setLikesOnPost] = useState(serializedLikeOnPost);

  const [postContent, setPostContent] = useState(serializedPost[0]);
  const [listComments, setListComments] = useState(serializedCommentsOnPost);
  const [postId, setPostId] = useState(queryId);
  const [imgUrlAr, setImgUrlAr] = useState([]);

  useEffect(() => {
    const a = parseLinks(postContent.imageUrl);
    setImgUrlAr(a);
  }, []);

  useEffect(() => {
    let likeCont = likesOnPost.find((item) => item.userId === userId);
    setLikePost(likeCont);
  }, [session, likesOnPost, likePost]);

  useEffect(() => {
    let sumStars = ratingList.reduce((accum, item) => {
      return accum + item.stars;
    }, 0);
    if (ratingList.length > 0) {
      setAverageRating(sumStars / ratingList.length);
    }
  }, [session, ratingList]);

  useEffect(() => {
    let userRating = ratingList?.find((item) => {
      return item.userId === userId;
    });
    setCurrentRating(userRating);
  }, [session, ratingList, userId]);

  // console.log(currentRating);
  const handleLike = async () => {
    if (likePost) {
      try {
        const likeId = likePost.id;
        const data = {
          likeId,
        };
        console.log(data);
        const response = await fetch("/api/prisma/deleteLike", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.status === 200) {
          console.log("okLike");
          setLikesOnPost(likesOnPost.filter((like) => like.id !== likePost.id));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const data = {
          postId,
          userId,
        };
        const response = await fetch("/api/prisma/addLike", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).then((res) => res.json());
        setLikesOnPost([...likesOnPost, response]);
        if (response.status === 200) {
          console.log("okLike");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const ratingPost = useCallback(
    async (stars) => {
      const filmId = postContent.film.id;

      try {
        const ratingId = currentRating?.id;
        const data = {
          filmId,
          userId,
          stars,
          ratingId,
        };
        const response = await fetch("/api/prisma/rating", {
          method: currentRating ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).then((data) => data.json());
        setRatingList([
          ...ratingList.filter((rating) => rating !== response.id),
          response,
        ]);
        if (response.status === 200) {
          console.log("okRating");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [ratingList, currentRating, postContent, userId]
  );
  const deletePost = async () => {
    try {
      const data = {
        postId,
      };
      const response = await fetch("/api/prisma/deletePost", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        router.push("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    try {
      const data = { postId, userId, textarea };

      const response = await fetch("/api/prisma/addComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        const data = { postId, userId, textarea };

        const response = await fetch("/api/prisma/getComment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        let a = await response.json();
        setListComments(a);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (commentId) => {
    try {
      const data = { commentId };

      const response = await fetch("/api/prisma/deleteComment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log("ok");
        const data = { postId, userId, textarea };

        const response = await fetch("/api/prisma/getComment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        let a = await response.json();
        setListComments(a);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex  w-full justify-center items-center flex-col">
        <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 px-5">
            <Tab.Group as="div" className="flex flex-col-reverse">
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {imgUrlAr ? (
                    <>
                      {imgUrlAr.map((image, index) => (
                        <Tab
                          key={index}
                          className="aspect-h-1 aspect-w-1 relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                        >
                          {({ selected }) => (
                            <>
                              <span className="absolute inset-0 overflow-hidden  rounded-md">
                                <img
                                  src={image}
                                  className="h-full w-full object-cover object-center"
                                />
                              </span>
                              <span
                                className={classNames(
                                  selected
                                    ? "ring-gray-500"
                                    : "ring-transparent",
                                  "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </Tab>
                      ))}
                    </>
                  ) : (
                    <>
                      <Tab className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4">
                        <img
                          src={movieFilm.src}
                          className="h-full w-full object-cover object-center"
                        />
                      </Tab>
                    </>
                  )}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {imgUrlAr ? (
                  <>
                    {imgUrlAr.map((image, index) => (
                      <Tab.Panel key={index}>
                        <img
                          src={image}
                          className="h-full w-full object-cover  object-center sm:rounded-lg"
                        />
                      </Tab.Panel>
                    ))}
                  </>
                ) : (
                  <>
                    <Tab.Panel>
                      <img
                        src={movieFilm.src}
                        className="h-full w-full object-cover  object-center sm:rounded-lg"
                      />
                    </Tab.Panel>
                  </>
                )}
              </Tab.Panels>
            </Tab.Group>
            <div className=" lg:col-span-2 mt-10 px-5  sm:mt-16 sm:px-0 lg:mt-0">
              <div className="flex flex-col gap-5">
                <div className="text-2xl flex justify-between font-bold tracking-tight text-gray-900">
                  <div> {postContent.author.name}</div>
                  <div className="flex gap-5">
                    {session?.user.name !== postContent.author.name ? (
                      <button
                        type="button"
                        onClick={() => deletePost}
                        className="inline-flex items-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                      >
                        {t("comments:delete")}
                      </button>
                    ) : null}
                    {session?.user.name !== postContent.author.name ? (
                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/newReview?edit=true&postId=${postId}`)
                        }
                        className="inline-flex items-center rounded-md bg-teal-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
                      >
                        {t("comments:edit")}
                      </button>
                    ) : null}
                  </div>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900">
                  {postContent.reviewName}
                </h1>
              </div>

              <div className="mt-3">
                <div className="text-xl tracking-tight text-gray-900 flex gap-7 ">
                  <div> {postContent.film.title}</div>
                  <div>
                    {t("comments:assessment")}: {postContent.stars}/10
                  </div>
                  <div>
                    {format(new Date(postContent.createdAt), "dd/MM/yy")}
                  </div>

                  <div
                    className={`relative z-10 rounded-full text-sm bg-gray-50 px-3 py-1.5 font-medium ${
                      postContent.category === "neutral"
                        ? "bg-slate-100"
                        : postContent.category === "positive"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    {postContent.category}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="space-y-6 text-base text-gray-700" />
                <ReactMarkdown>{postContent.content}</ReactMarkdown>
              </div>
              <div className="flex justify-center items-center gap-20">
                <button
                  type="button"
                  onClick={() => {
                    handleLike();
                  }}
                  className="flex items-center justify-center rounded-md px-3 py-3 "
                >
                  <HeartIcon
                    className={`h-20 w-20 flex-shrink-0   px-3 py-3 ${
                      likePost
                        ? " text-red-500 fill-current"
                        : " text-gray-200 fill-current"
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <>{likesOnPost.length}</>
                <div className="items-center">
                  <div>
                    {averageRating ? (
                      averageRating.toFixed(1)
                    ) : (
                      <p>not rated yet</p>
                    )}
                  </div>

                  <Rating
                    name="customized-10"
                    onChange={(event, newValue) => {
                      ratingPost(newValue);
                    }}
                    value={currentRating?.stars ?? 0}
                    max={5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" max-w-2xl w-1/2 lg:max-w-4xl ">
          <ul role="list" className="rounded-md  shadow   ">
            {listComments.length !== 0 ? (
              <>
                {listComments.map((item) => (
                  <li
                    key={item.id}
                    className={
                      "p-4 h-auto my-5 py-2 rounded-md shadow-lg  sm:rounded-md sm:px-6 flex flex-col gap-3 bg-white"
                    }
                  >
                    <div className="flex justify-start justify-items-end gap-5">
                      <div className="font-bold">{item.user.name}</div>
                      <div className="text-slate-400 ">
                        {format(new Date(item.createdAt), "dd/MM/yy")}
                      </div>
                    </div>
                    <p className="text-slate-500 ">{item.content}</p>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => deleteComment(item.id)}
                        className="  rounded-md bg-red-100 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-200"
                      >
                        {t("comments:delete")}
                      </button>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <>
                <div className="p-4  h-auto my-5 py-2 rounded-md shadow-lg  sm:rounded-md sm:px-6 flex flex-col gap-3 bg-white">
                  {t("comments:noComments")}
                </div>
              </>
            )}
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
                          placeholder={t("comments:addComment")}
                          defaultValue={""}
                          onChange={(ev) => setTextarea(ev.target.value)}
                        />
                      </div>

                      <div className=" flex justify-between py-2 pl-3 pr-2">
                        <div className="flex items-center space-x-5"></div>
                        <div className="flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => addComment}
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

export async function getServerSideProps({ locale, query }) {
  const post = await prisma.review.findMany({
    where: {
      id: +query.postId,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      film: {
        select: {
          title: true,
          id: true,
        },
      },
    },
  });
  const serializedPost = post.map((postContent) => ({
    ...postContent,
    createdAt: postContent.createdAt.toISOString(),
  }));
  const likeOnPost = await prisma.like.findMany({
    where: {
      reviewId: +query.postId,
    },
  });
  const serializedLikeOnPost = likeOnPost.map((likes) => ({
    ...likes,
    createdAt: likes.createdAt.toISOString(),
  }));
  const commentsOnPost = await prisma.comment.findMany({
    where: {
      reviewId: +query.postId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  const serializedCommentsOnPost = commentsOnPost.map((comments) => ({
    ...comments,
    createdAt: comments.createdAt.toISOString(),
  }));
  const queryId = query.postId;

  const ratingsOnPost = await prisma.rating.findMany({
    where: {
      // reviewId: +query.postId,
      filmId: post.filmId,
    },
  });
  const serializedRatingsOnPost = ratingsOnPost.map((rating) => ({
    ...rating,
    createdAt: rating.createdAt.toISOString(),
  }));
  // console.log("serializedPost", serializedPost);
  // console.log("serializedCommentsOnPost", serializedCommentsOnPost);
  // console.log("query", query);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["comments", "common"])),
      serializedPost,
      serializedLikeOnPost,
      serializedCommentsOnPost,
      serializedRatingsOnPost,
      queryId,
    },
  };
}
