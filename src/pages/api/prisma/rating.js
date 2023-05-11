import prisma from "@/lib/prisma";

export default async function addLike(req, res) {
  if (req.method === "POST") {
    const { filmId, userId, stars } = req.body;

    try {
      const result = await prisma.rating.create({
        data: {
          filmId: +filmId,
          userId: userId,
          stars: +stars,
        },
      });
      res.json(result);
    } catch (error) {
      res.status(403);
      console.log(error);
    }
  }
  if (req.method === "PATCH") {
    const { postId, userId, stars, ratingId, filmId } = req.body;

    try {
      const result = await prisma.rating.update({
        where: {
          id: +ratingId,
        },
        data: {
          stars: +stars,
          userId: userId,
          filmId: +filmId,
        },
      });
      res.json(result);
    } catch (error) {
      res.status(403);
      console.log(error);
    }
  }
}
