import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

function Review() {
  const [film, setFilm] = useState("");
  const [rating, setRating] = useState(0);
  const [nameOfReview, setNameOfReview] = useState("");
  const [group, setGroup] = useState("");
  const { t } = useTranslation();

  // const [tagCloud, setTagCloud] = useState([]);
  const tagCloud = [
    { title: "The Shashlik Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();
  const [textComment, setTextComment] = useState("");
  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setMessage("only images accepted");
      }
    }
  };
  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };
  return (
    <>
      <div className="flex flex-col  mt-5 w-full items-center mb-5">
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
              options={tagCloud.map(
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
            <button
              type="button"
              // onClick={click}
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {t("review:addNewFilm")}
            </button>
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
              <option value="Positive">{t("review:positive")}</option>
              <option value="Neutral">{t("review:neutral")}</option>
              <option value="Negative">{t("review:negative")}</option>
            </select>
          </div>
        </div>

        <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3 rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6 font-bold">
            {t("review:tagOfReview")}
          </div>
          <div className="px-4 py-5 sm:p-6">
            <Autocomplete
              multiple
              id="tags-outlined"
              className="border-none hover:border-none rounded-md bg-transparent py-1.5 pl-1 focus:ring-0 active:border-none sm:text-sm sm:leading-6  w-full"
              options={tagCloud}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Favorites"
                  className=" border-none hover:border-none bg-transparent active:border-none py-1.5 pl-1 sm:text-sm sm:leading-6  w-full"
                />
              )}
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
                  defaultValue={""}
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

          <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">
            {message}
          </span>
          <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer  text-black border-gray-400 border-dotted">
            <input
              type="file"
              onChange={handleFile}
              className="h-full w-full opacity-0 z-10 absolute"
              multiple="multiple"
              name="files[]"
            />
            <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
              <div className="flex flex-col">
                <i className="mdi mdi-folder-open text-[30px] text-black text-center"></i>
                <span className="text-[12px]">{`Drag and Drop a file`}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {files.map((file, key) => {
              return (
                <div
                  key={key}
                  className="w-full h-16 flex items-center justify-between rounded p-3 bg-gray-100"
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="h-12 w-12 ">
                      <Image
                        className="w-full h-full rounded"
                        src={URL.createObjectURL(file)}
                        alt="url"
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

        <button
          type="button"
          className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {t("review:submit")}
        </button>
      </div>
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