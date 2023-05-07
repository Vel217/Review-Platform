import prisma from "@/lib/prisma";

export default async function addNewFilm(req, res) {
  const { filmName, filmYear, filmDirector } = req.body;
  const result = await prisma.film.create({
    data: {
      title: filmName,
      year: +filmYear,
      director: filmDirector,
    },
  });

  res.json(result);
}
