import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import movieFilm from "../../../public/assets/images/movie-film2.png";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import parseLinks from "@/components/parseLink";
import { useRouter } from "next/router";

function MyPage(props) {
  const { data: session } = useSession();
  const [userId, setUserId] = useState(session?.user.id);
  // const [userId, setUserId] = useState("clhc83zgp0000lc09djw31scg");

  const { t } = useTranslation();
  const [listReviews, setListReview] = useState(props.serializedReviews);

  const router = useRouter();
  return (
    <>
      <div className="flex flex-col w-full  justify-center bg-white">
        <div className="w-screen px-6 mx-auto divide-y divide-gray-200 overflow-hidden  flex justify-between  rounded-lg bg-white shadow"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="mt-5 space-y-8 lg:mt-10 lg:space-y-10">
              {listReviews.map((post) => (
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

export async function getServerSideProps({ locale, query }) {
  const queryTag = query?.tag;
  const querySearch = query?.search;
  const reviews = await prisma.review.findMany({
    where: {
      Taggings: {
        some: {
          tag: {
            title: queryTag,
          },
        },
      },
    },

    include: {
      author: {
        select: {
          name: true,
        },
      },
      Taggings: {
        select: {
          tagId: true,
          tag: {
            select: {
              title: true,
            },
          },
        },
      },
      Like: {
        select: {
          id: true,
        },
      },
      Comment: {
        select: {
          id: true,
        },
      },
      film: {
        select: {
          title: true,
          rating: {
            select: {
              stars: true,
            },
          },
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
      ...(await serverSideTranslations(locale, ["search", "common"])),
      serializedReviews,
    },
  };
}
