import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import movieFilm from "../../../public/assets/images/movie-film2.png";
import Link from "next/link";

function Index() {
  const { t } = useTranslation();
  //   const [peopleList, setPeopleList] = useState([])
  const peopleList = [
    {
      id: "1",
      name: "Leslie Alexander",
      email: "leslie.alexander@example.com",
      isAdmin: true,
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",

      created_at: "2023-01-23T13:23Z",
    },
    {
      id: "2",
      name: "Michael Foster",
      email: "michael.foster@example.com",
      isAdmin: false,
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",

      created_at: "2023-01-23T13:23Z",
    },
    {
      id: "3",
      name: "Dries Vincent",
      email: "dries.vincent@example.com",
      isAdmin: false,
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",
      created_at: "2023-01-23T13:23Z",
    },
    {
      id: "4",
      name: "Lindsay Walton",
      email: "lindsay.walton@example.com",
      isAdmin: false,
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",

      created_at: "2023-01-23T13:23Z",
    },
    {
      id: "5",
      name: "Courtney Henry",
      email: "courtney.henry@example.com",
      isAdmin: false,
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",

      created_at: "2023-01-23T13:23Z",
    },
    {
      id: "6",
      name: "Tom Cook",
      email: "tom.cook@example.com",
      isAdmin: false,
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",
      created_at: "2023-01-23T13:23Z",
    },
  ];
  const { data: session } = useSession();
  console.log(session);
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
                      <Link href="#">
                        <span className="absolute inset-x-0 -top-px bottom-0" />
                        {person.name}
                      </Link>
                    </p>
                    {/* <p> may be add count of posts</p> */}
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

                      {person.created_at}
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
  return {
    props: {
      ...(await serverSideTranslations(locale, ["admin", "common"])),
    },
  };
}
