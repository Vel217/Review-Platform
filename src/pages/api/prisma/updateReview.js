import prisma from "@/lib/prisma";

export default async function updateReview(req, res) {
  const {
    film,
    nameOfReview,
    group,
    userId,
    textContent,
    filesUrlDB,
    rating,
    postId,
  } = req.body;
  const result = await prisma.review.update({
    where: {
      id: +postId,
    },
    data: {
      reviewName: nameOfReview,
      filmId: +film,
      category: group,
      authorId: userId,
      imageUrl: filesUrlDB,
      content: textContent,
      stars: rating,
    },
  });

  res.json(result);
}
