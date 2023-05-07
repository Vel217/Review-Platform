import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSession } from "next-auth/react";

import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import ReactMarkdown from "react-markdown";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Link from "next/link";

function Review() {
  const { data: session } = useSession();
  console.log(session);
  const [film, setFilm] = useState("");
  const [rating, setRating] = useState(0);
  const [nameOfReview, setNameOfReview] = useState("");
  const [group, setGroup] = useState("");
  const [tags, setTags] = useState([]);
  const { t } = useTranslation();
  const [filesUrls, setFilesUrls] = useState([]);
  const [previewFiles, setPreviewFile] = useState([]);
  const ref = useRef([]);
  const [textComment, setTextComment] = useState("");
  const [error, setError] = useState(false);

  const updatePreviewFiles = useCallback(
    (files) => {
      // console.log("previewFiles", previewFiles);
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

  const [tagCloud, setTagCloud] = useState([]);
  // const tagCloud = [
  //   "The Shawshank Redemption",
  //   "The Godfather",
  //   "The Godfather: Part II",
  //   "The Dark Knight",
  //   "12 Angry Men",
  //   "Schindler's List",
  //   "Pulp Fiction",
  //   "The Lord of the Rings: The Return of the King",
  //   "Fight Club",
  // ];
  const [selectedTag, setSelectedTag] = useState([]);

  const [tagNew, setTagNew] = useState([]);

  // const [filmList, setFilmList] = useState([]);
  const filmList = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    {
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
    },
    {
      title: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
    },
  ];
  useEffect(() => {
    setError(false);
  }, [film, nameOfReview, group, selectedTag, textComment, rating]);

  const addReview = async (ev) => {
    ev.preventDefault();
    try {
      const data = {
        film,
        nameOfReview,
        group,
        selectedTag,
        textComment,
        filesUrls,
        rating,
      };
      if (
        film === "" ||
        group === "" ||
        nameOfReview === "" ||
        rating === 0 ||
        selectedTag === [] ||
        textComment === ""
      ) {
        return setError(true);
      } else {
        // const response = await fetch("api/prisma/newReview", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(data),
        // });
        // if (response.status === 200) {
        //   router.push("/main");
        // }
        console.log("bag");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="flex flex-col  mt-5 w-full items-center mb-5">
        <h2 className="text-base text-center font-semibold leading-7 ">
          {t("review:addNewRev")}
        </h2>
        <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3 rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6 font-bold">
            {t("review:nameOfMovie")}
          </div>
          <div className=" flex gap-5 px-4 py-5 sm:p-6 ">
            <Autocomplete
              freeSolo
              className="border-none hover:border-none rounded-md bg-transparent py-1.5 pl-1 focus:ring-0 active:border-none sm:text-sm sm:leading-6  w-full"
              id="free-solo-2-demo"
              disableClearable
              onChange={(event, value) => setFilm(value)}
              options={filmList.map(
                (option) => option.title + ", " + option.year
              )}
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
        <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3 rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6 font-bold">
            {t("review:nameOfRev")}
          </div>
          <div className="px-4 py-5 sm:p-6">
            <input
              type="text"
              onChange={(ev) => setNameOfReview(ev.target.value)}
              className="border-1 rounded-md bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6  w-1/2"
            />
          </div>
        </div>

        <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3 rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6 font-bold">
            {t("review:groupOfReview")}
          </div>
          <div className="px-4 py-5 sm:p-6">
            <select
              name="location"
              onChange={(ev) => {
                setGroup(ev.target.value);
              }}
              className="mt-2 block w-1/2 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="positive" selected>
                {t("review:positive")}
              </option>
              <option value="neutral">{t("review:neutral")}</option>
              <option value="negative">{t("review:negative")}</option>
            </select>
          </div>
        </div>

        <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3 rounded-lg bg-white shadow">
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
                if (!tagCloud.includes(newValue)) {
                  setTagCloud([...tagCloud, newValue]);
                }
                setSelectedTag([...selectedTag, newValue]);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>

        <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3  rounded-lg bg-white shadow ">
          <div className="px-4 py-5 sm:px-6 font-bold justify-start">
            {t("review:textOfReview")}
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="min-h-full flex gap-2 px-4 py-3 sm:py-4">
              <div className="w-1/2 ">
                <textarea
                  rows={8}
                  className="block w-full resize-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={textComment}
                  onChange={(ev) => {
                    setTextComment(ev.target.value);
                  }}
                />
              </div>
              <div className="w-1/2 block  rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <article class="prose prose-sm">
                  <ReactMarkdown>{textComment}</ReactMarkdown>
                </article>
              </div>
            </div>
          </div>
        </div>

        <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3 rounded-lg bg-white shadow px-6 py-4">
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

        <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3 rounded-lg bg-white shadow mb-5">
          <div className="px-4 py-5 sm:px-6 font-bold">
            {t("review:rating")}
          </div>
          <div className="px-4 py-5 sm:p-6">
            <Rating
              name="customized-10"
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              max={10}
              defaultValue={0}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </div>
        </div>
        {error && (
          <div className="items-center  flex w-2/3 rounded-lg bg-red-600 h-20 shadow mb-5">
            {" "}
            <div className="mx-auto text-xl text-black-300">
              {" "}
              все поля должны быть заполнены
            </div>
          </div>
        )}

        <button
          type="submit"
          onClick={addReview}
          className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {t("review:submit")}
        </button>
      </form>
    </>
  );
}

export default Review;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["review", "common"])),
    },
  };
}
