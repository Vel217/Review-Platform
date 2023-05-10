import prisma from "@/lib/prisma";

export default async function addNewReview(req, res) {
  const {
    selectedFilmId,
    nameOfReview,
    group,
    userId,
    textContent,
    filesUrlDB,
    rating,
  } = req.body;
  const result = await prisma.review.create({
    data: {
      reviewName: nameOfReview,
      filmId: +selectedFilmId,
      category: group,
      authorId: "clhc83zgp0000lc09djw31scg",
      imageUrl: filesUrlDB,
      content: textContent,
      stars: rating,
    },
  });

  res.json(result);
}
