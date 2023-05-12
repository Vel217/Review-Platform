import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ReactMarkdown from "react-markdown";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

function Review(props) {
  const EditParams = Boolean(props.serializedReviewEdit);
  const { data: session } = useSession();
  const [userId, setUserId] = useState(session?.user.id);
  // const [userId, setUserId] = useState("clhc83zgp0000lc09djw31scg");

  const [film, setFilm] = useState("");
  const [rating, setRating] = useState(0);
  const [nameOfReview, setNameOfReview] = useState("");
  const [group, setGroup] = useState("");
  const [tags, setTags] = useState([]);
  const { t } = useTranslation();
  const [filesUrls, setFilesUrls] = useState([]);
  const [filesUrlsEdit, setFilesUrlsEdit] = useState("");
  const [previewFiles, setPreviewFile] = useState([]);
  const ref = useRef([]);
  const [textContent, setTextContent] = useState("");
  const [error, setError] = useState(false);

  const [tagCloud, setTagCloud] = useState([...props.tagsTitle]);
  const [reviewTags, setReviewTags] = useState([]);

  const [selectedFilmId, setSelectedFilmId] = useState("");
  const [filmList, setFilmList] = useState([...props.serializedFilms]);
  const router = useRouter();
  const [postId, setPostId] = useState(props.query.postId);
  const [userList, setUserList] = useState(props.serializedUserList);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [errorPost, setErrorPost] = useState(false);
  useEffect(() => {
    if (props.serializedReviewEdit) {
      setSelectedFilmId(props.serializedReviewEdit.filmId);
      setNameOfReview(props.serializedReviewEdit.reviewName);
      setTextContent(props.serializedReviewEdit.content);
      setGroup(props.serializedReviewEdit.category);
      setRating(props.serializedReviewEdit.stars);
      setFilesUrls(props.serializedReviewEdit.imageUrl.split(","));
    }
  }, []);

  const updatePreviewFiles = useCallback(
    (files) => {
      setPreviewFile([...previewFiles, ...files]);
    },
    [previewFiles]
  );

  const postFile = async (file) => {
    const url = "https://api.cloudinary.com/v1_1/dfyhsmubh/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cojltzo7");

    return await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.url;
      });
  };

  const uploadFiles = async (files) => {
    for (let i = 0; i < files.length; i++) {
      const res = await postFile(files[i]);
      ref.current = [...ref.current, res];
    }

    setFilesUrls([...filesUrls, ...ref.current]);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      updatePreviewFiles(files);
      uploadFiles(files);
    },
    [updatePreviewFiles, uploadFiles]
  );

  const { fileRejections, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,

      accept: {
        "image/jpeg": [".jpeg", ".png"],
      },
      maxFiles: 3,
    });

  const removeImage = (i) => {
    setPreviewFile(previewFiles.filter((x) => x.name !== i));
  };

  useEffect(() => {
    if (!EditParams) {
      let selectFilmId = film.id;
      if (selectFilmId) {
        setSelectedFilmId(selectFilmId);
      }
    }
  }, [film]);

  useEffect(() => {
    setError(false);
  }, [film, nameOfReview, group, textContent, rating]);

  const addReview = async (ev) => {
    ev.preventDefault();
    // setUserId(session.user.id);
    let filesUrlDB;
    if (filesUrls.length === 1) {
      filesUrlDB = filesUrls[0];
    } else if (filesUrls.length > 1) {
      filesUrlDB = filesUrls.join(",");
    } else {
      filesUrlDB = "";
    }
    setErrorPost(false);
    const reviewTagsObj = reviewTags.map((e) => ({ title: e }));

    try {
      const data = {
        film,
        nameOfReview,
        group,
        userId,
        textContent,
        filesUrlDB,
        rating,
        postId,
        reviewTags,
        reviewTagsObj,
      };

      if (
        film === "" ||
        group === "" ||
        nameOfReview === "" ||
        rating === 0 ||
        textContent === ""
      ) {
        return setError(true);
      } else {
        if (!EditParams) {
          const response = await fetch(`/api/prisma/newReview`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (response.status === 200) {
            router.push("/main");
          } else {
            setErrorPost(true);
          }
        } else {
          const response = await fetch(`/api/prisma/updateReview`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
            .then((data) => data.json())
            .then((data) => setReviewId(data.id));
          if (response.status === 200) {
            router.push("/main");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col lg: mt-5 w-full items-center mb-5">
        <div className="absolute  left-3 top-10 lg:left-5 lg:top-20">
          {" "}
          <button
            className=" rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => router.back()}
          >
            {t("review:back")}
          </button>
        </div>

        {session?.user.isAdmin ? (
          <>
            {t("review:Admin")}
            <Autocomplete
              freeSolo
              className="border-none hover:border-none rounded-md bg-transparent py-1.5 pl-1 focus:ring-0 active:border-none sm:text-sm sm:leading-6  w-full"
              id="free-solo-2-demo"
              disableClearable
              // value={EditParams ? props.serializedReviewEdit.filmId : null}
              onChange={(event, value) => setSelectedUser(value)}
              options={userList.map((user) => user.name)}
              getOptionLabel={(userName) => {
                const user = userList.find((user) => user.name === userName);
                return user ? `${user.title}, ${user.year}` : "";
              }}
              renderInput={(params) => (
                <TextField
                  className=" border-none hover:border-none bg-transparent active:border-none py-1.5 pl-1 sm:text-sm sm:leading-6  w-full"
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    type: "search user",
                  }}
                />
              )}
            />
          </>
        ) : null}
        <h2 className="text-base text-center font-semibold leading-7 ">
          {EditParams ? (
            <>{t("review:editEd")}</>
          ) : (
            <>{t("review:addNewRev")} </>
          )}
        </h2>
        <div className="items-center divide-y divide-gray-200 overflow-hidden  lg:w-2/3 w-full rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6 font-bold">
            {t("review:nameOfMovie")}
          </div>
          <div className=" flex gap-5 flex-col lg:flex  px-4 py-5 sm:p-6 ">
            <Autocomplete
              freeSolo
              className="border-none hover:border-none rounded-md bg-transparent py-1.5 pl-1 focus:ring-0 active:border-none sm:text-sm sm:leading-6  w-full"
              id="free-solo-2-demo"
              disableClearable
              value={EditParams ? props.serializedReviewEdit.filmId : null}
              onChange={(event, value) => setFilm(value)}
              options={filmList.map((film) => film.id)}
              getOptionLabel={(filmId) => {
                const film = filmList.find((film) => film.id === filmId);
                return film ? `${film.title}, ${film.year}` : "";
              }}
              renderInput={(params) => (
                <TextField
                  className=" border-none hover:border-none bg-transparent active:border-none py-1.5 pl-1 sm:text-sm sm:leading-6  w-full"
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            <Link href="/addFilm" className="flex justify-center items-center">
              {" "}
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {t("review:addNewFilm")}
              </button>
            </Link>
          </div>
        </div>
        <div className="items-center divide-y divide-gray-200 overflow-hidden lg:w-2/3 w-full rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6 font-bold">
            {t("review:nameOfRev")}
          </div>
          <div className="px-4 py-5 sm:p-6">
            <input
              type="text"
              value={nameOfReview}
              onChange={(ev) => setNameOfReview(ev.target.value)}
              className="border-1 w-full rounded-md bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6  lg:w-1/2"
            />
          </div>
        </div>
        <div className="items-center divide-y divide-gray-200 overflow-hidden lg:w-2/3 w-full rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6 font-bold">
            {t("review:groupOfReview")}
          </div>
          <div className="px-4 py-5 sm:p-6">
            <select
              name="language"
              onChange={(ev) => {
                setGroup(ev.target.value);
              }}
              value={group}
              className="mt-2 block w-full lg:w-1/2 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value=""> </option>
              <option value="positive">{t("review:positive")}</option>
              <option value="neutral">{t("review:neutral")}</option>
              <option value="negative">{t("review:negative")}</option>
            </select>
          </div>
        </div>
        <div className="items-center divide-y divide-gray-200 overflow-hidden lg:w-2/3 w-full rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6 font-bold">
            {t("review:tagOfReview")}
          </div>
          <div className="px-4 py-5 sm:p-6">
            <Autocomplete
              freeSolo
              multiple
              id="tags-outlined"
              className="border-none hover:border-none rounded-md bg-transparent py-1.5 focus:ring-0 active:border-none sm:text-sm sm:leading-6 w-full"
              options={tagCloud}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={(event, value) => {
                const newValue = value[value.length - 1];
                setReviewTags([...reviewTags, newValue]);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>
        <div className="items-center divide-y divide-gray-200 overflow-hidden lg:w-2/3 w-full  rounded-lg bg-white shadow ">
          <div className="px-4 py-5 sm:px-6 font-bold justify-start">
            {t("review:textOfReview")}
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="min-h-full flex gap-2 px-4 py-3 sm:py-4">
              <div className="w-1/2 ">
                <textarea
                  rows={10}
                  className="block w-full resize-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={textContent}
                  onChange={(ev) => {
                    setTextContent(ev.target.value);
                  }}
                />
              </div>
              <div className="w-1/2 block  rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <article className="prose prose-sm h-60 overflow-y-auto">
                  <ReactMarkdown>{textContent}</ReactMarkdown>
                </article>
              </div>
            </div>
          </div>
        </div>
        <div className="items-center divide-y divide-gray-200 overflow-hidden lg:w-2/3 w-full rounded-lg bg-white shadow px-6 py-4">
          <div className="px-4 py-5 sm:px-6 font-bold">
            {t("review:addPic")}
          </div>

          <div className="flex flex-col px-4 py-3 sm:py-4">
            <div className="col-span-full">
              <div className=" flex  w-full h-full justify-center items-center bg-white px-2">
                <div className="p-3 w-full h-full flex flex-col justify-center items-center rounded-md">
                  <div
                    {...getRootProps({
                      role: "button",
                    })}
                    className="w-full h-40 overflow-hidden shadow-md border-2 justify-center items-center rounded-md cursor-pointer  text-black border-gray-400 border-dotted"
                  >
                    <input
                      {...getInputProps()}
                      type="file"
                      className="flex h-full w-full items-center justify-center"
                      multiple={true}
                    />
                    {isDragActive ? (
                      <p className=" h-full w-full bg-gray-50 text-md text-green-500 flex justify-center items-center top-0">
                        {t("review:dropFiles")}
                      </p>
                    ) : (
                      <p className=" h-full w-full bg-gray-50  text-sm flex justify-center items-center top-0">
                        {t("review:dnd")}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {previewFiles.map((file, key) => {
                      return (
                        <div
                          key={key}
                          className="w-full h-16 flex items-center justify-between rounded p-3 bg-gray-100"
                        >
                          <div className="flex flex-row items-center gap-2">
                            <div className="h-12 w-12 ">
                              <img
                                className="w-full h-full rounded"
                                src={file.preview}
                              />
                            </div>
                            <span className="text-black truncate w-44">
                              {file.name}
                            </span>
                          </div>
                          <div
                            onClick={() => {
                              removeImage(file.name);
                            }}
                            className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm"
                          >
                            <i className="mdi mdi-trash-can text-white text-[14px]">
                              X
                            </i>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="items-center divide-y divide-gray-200 overflow-hidden lg:w-2/3 w-full rounded-lg bg-white shadow mb-5">
          <div className="px-4 py-5 sm:px-6 font-bold">
            {t("review:rating")}
          </div>
          <div className="px-4 py-5 sm:p-6">
            <Rating
              name="customized-10"
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              value={rating}
              max={10}
              defaultValue={0}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </div>
        </div>
        {error && (
          <div className="items-center  flex lg:w-2/3 w-full rounded-lg bg-red-600 h-20 shadow mb-5">
            {" "}
            <div className="mx-auto text-xl text-black-300">
              {" "}
              {t("review:mustFilled")}
            </div>
          </div>
        )}
        {errorPost && (
          <div className="items-center  flex lg:w-2/3 w-full rounded-lg bg-red-600 h-20 shadow mb-5">
            {" "}
            <div className="mx-auto text-xl text-black-300">
              {" "}
              {t("review:error")}
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={addReview}
          className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {t("review:submit")}
        </button>
      </div>
    </>
  );
}

export default Review;

export async function getServerSideProps({ locale, query }) {
  const films = await prisma.film.findMany();
  const serializedFilms = films.map((film) => ({
    ...film,
    createdAt: film.createdAt.toISOString(),
  }));
  const userList = await prisma.user.findMany();
  const serializedUserList = userList.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
  }));

  const tags = await prisma.tag.findMany();
  const serializedTags = tags.map((tag) => ({
    ...tag,
    createdAt: tag.createdAt.toISOString(),
  }));
  const tagsTitle = serializedTags.map((tag) => {
    return tag.title;
  });

  let serializedReviewEdit = null;
  if (query.postId) {
    serializedReviewEdit = await prisma.review.findUnique({
      where: { id: +query.postId },
    });

    const a = serializedReviewEdit.createdAt.toISOString();

    serializedReviewEdit.createdAt =
      serializedReviewEdit.createdAt.toISOString();
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["review", "common"])),
      serializedFilms,
      serializedTags,
      serializedReviewEdit,
      tagsTitle,
      query,
      serializedUserList,
    },
    // notFound: true,
  };
}
