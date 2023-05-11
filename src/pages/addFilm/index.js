import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

function NewFilm() {
  const { t } = useTranslation();
  const [filmName, setFilmName] = useState("");
  const [filmYear, setFilmYear] = useState("");
  const [filmDirector, setFilmDirector] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
  }, [filmName, filmYear, filmDirector]);
  const addFilm = async (ev) => {
    ev.preventDefault();
    try {
      if (filmName === "" || filmYear === "" || filmDirector === "") {
        setError(true);
      } else {
        const data = { filmName, filmYear, filmDirector };
        const response = await fetch("/api/prisma/newFilm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.status === 200) {
          router.push("/newReview");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="">
        <div className="flex flex-col mt-5 w-full items-center mb-5">
          <h2 className="text-base text-center font-semibold leading-7 ">
            {t("addFilm:newFilm")}
          </h2>

          <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3 rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6 font-bold">
              {" "}
              {t("addFilm:name")}
            </div>
            <div className=" flex gap-5 px-4 py-5 sm:p-6 ">
              <input
                type="text"
                onChange={(ev) => {
                  setFilmName(ev.target.value);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3 rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6 font-bold">
              {" "}
              {t("addFilm:year")}
            </div>
            <div className=" flex gap-5 px-4 py-5 sm:p-6 ">
              <input
                type="text"
                onChange={(ev) => {
                  setFilmYear(ev.target.value);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="items-center divide-y divide-gray-200 overflow-hidden w-2/3 rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6 font-bold">
              {" "}
              {t("addFilm:director")}
            </div>
            <div className=" flex gap-5 px-4 py-5 sm:p-6 ">
              <input
                type="text"
                onChange={(ev) => {
                  setFilmDirector(ev.target.value);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addFilm}
            className="rounded-full bg-indigo-600 px-3 py-1.5 m-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t("addFilm:add")}
          </button>
        </div>
      </div>
    </>
  );
}

export default NewFilm;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["addFilm", "common"])),
    },
  };
}
