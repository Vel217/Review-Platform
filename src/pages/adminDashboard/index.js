import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import movieFilm from "../../../public/assets/images/movie-film2.png";
import prisma from "@/lib/prisma";
import { format } from "date-fns";

function Index(props) {
  const { t } = useTranslation();
  const [peopleList, setPeopleList] = useState(props.serializedUsersList);

  const { data: session } = useSession();

  return (
    <>
      <div className="w-screen">
        <div className="flex w-full justify-center items-center bg-white ">
          <ul role="list" className="divide-y w-full divide-gray-100 px-20  ">
            <p className="flex justify-center text-xl py-8 ">
              {" "}
              {t("admin:list")}
            </p>
            {peopleList.map((person) => (
              <li
                key={person.id}
                className="relative flex justify-between gap-x-6 py-5"
              >
                <div className="flex gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={
                      person.imageUrl !== "" ? person.imageUrl : movieFilm.src
                    }
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      <button
                        onClick={() =>
                          router.push(`/myPage?userId=${person.id}`)
                        }
                      >
                        <span className="absolute inset-x-0 -top-px bottom-0" />
                        {person.name}
                      </button>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {person.isAdmin ? (
                        <>{t("admin:admin")} </>
                      ) : (
                        <>{t("admin:user")}</>
                      )}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {t("admin:regDate")}
                      <br />

                      {format(new Date(person.createdAt), "dd/MM/yy")}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Index;

export async function getStaticProps({ locale }) {
  const usersList = await prisma.user.findMany();
  const serializedUsersList = usersList.map((list) => ({
    ...list,
    createdAt: list.createdAt.toISOString(),
  }));
  return {
    props: {
      ...(await serverSideTranslations(locale, ["admin", "common"])),
      serializedUsersList,
    },
  };
}
