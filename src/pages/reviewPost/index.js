import Link from "next/link";

import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { HeartIcon } from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { useSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import parseLinks from "@/components/parseLink";
import movieFilm from "../../../public/assets/images/movie-film2.png";
import { format } from "date-fns";
import { useRouter } from "next/router";

// const postContent = {
//   reviewName: "Crash of titanic",
//   filmId: "Titanic",
//   category: "positive",
//   stars: 4,
//   authorId: "Marat",
//   createdAt: "10.05.2022",
//   imageUrl: [
//     "http://res.cloudinary.com/dfyhsmubh/image/upload/v1683551975/wme6zpmftiscwkjfkaal.png",
//     "http://res.cloudinary.com/dfyhsmubh/image/upload/v1683551976/iessezkywmcpb0e7ohde.png",
//     "http://res.cloudinary.com/dfyhsmubh/image/upload/v1683551978/udzi9pseu2nboqog3msu.png",
//   ],

//   content:
//     "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised worThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look ds which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
// };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
// const listComments = [
//   {
//     id: 1,
//     userName: "Popka",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//     createAt: "12.04.2022",
//   },
//   {
//     id: 2,
//     userName: "Popka",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//     createAt: "12.04.2022",
//   },
//   {
//     id: 3,
//     userName: "Popka",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//     createAt: "12.04.2022",
//   },
// ];

function Item({
  serializedPost,
  serializedLikeOnPost,
  serializedCommentsOnPost,
  queryId,
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [userId, setUserId] = useState(session?.user.id);
  const { t } = useTranslation();
  const [textarea, setTextarea] = useState("");
  const [rating, setRating] = useState(0);
  const [likePost, setLikePost] = useState(false);
  const [postContent, setPostContent] = useState(serializedPost[0]);

  const [listComments, setListComments] = useState(serializedCommentsOnPost);
  const [likes, setLikes] = useState(serializedLikeOnPost);
  const [postId, setPostId] = useState(queryId);
  const [imgUrlAr, setImgUrlAr] = useState([]);
  useEffect(() => {
    const a = parseLinks(postContent.imageUrl);
    setImgUrlAr(a);
  }, []);

  //
  // async
  //
  const handleLike = () => {
    if (likePost) {
      // await sendRequestToRemoveLike();
      console.log("ToRemoveLike");
    } else {
      console.log("ToAddLike");
      // await sendRequestToAddLike();
    }

    setLikePost(!likePost);
  };
  //
  // async
  //
  const ratingPost = () => {
    if (rating) {
      // await sendRequestToRemoveRating();
      console.log("ToRemoveRating");
    } else {
      console.log("ToAddRating");
      // await sendRequestToAddRating();
    }
  };
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
                          className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
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
                        onClick={deletePost}
                        className="inline-flex items-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                      >
                        delete
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
                        edit
                      </button>
                    ) : null}
                  </div>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900">
                  {postContent.reviewName}
                </h1>
              </div>

              <div className="mt-3">
                <div className="text-xl tracking-tight text-gray-900 flex justify-between">
                  <div> {postContent.film.title}</div>
                  <div>assessment: {postContent.stars}/10</div>
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
                  <span className="sr-only">Add to favorites</span>
                </button>
                <div className="items-center">
                  <Rating
                    name="customized-10"
                    onChange={(event, newValue) => {
                      ratingPost;
                      setRating(newValue);
                    }}
                    value={rating}
                    max={5}
                    defaultValue={0}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ????? */}

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
                      <p className="font-bold">{item.user.name}</p>
                      <p className="text-slate-400 ">
                        {format(new Date(item.createdAt), "dd/MM/yy")}
                      </p>
                    </div>
                    <p className="text-slate-500 ">{item.content}</p>
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
              </>
            ) : (
              <>
                <div className="p-4  h-auto my-5 py-2 rounded-md shadow-lg  sm:rounded-md sm:px-6 flex flex-col gap-3 bg-white">
                  Здесь пока нет коментариев
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
                            onClick={addComment}
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
  // console.log("serializedPost", serializedPost);
  // console.log("serializedCommentsOnPost", serializedCommentsOnPost);
  // console.log("query", query);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["comments", "common"])),
      serializedPost,
      serializedLikeOnPost,
      serializedCommentsOnPost,
      queryId,
    },
  };
}
