import prisma from "@/lib/prisma";

export default async function addLike(req, res) {
  if (req.method === "POST") {
    const { postId, userId, rating } = req.body;

    try {
      const result = await prisma.rating.create({
        data: {
          reviewId: +postId,
          userId: userId,
          stars: rating,
        },
      });
      res.json(result);
    } catch (error) {
      res.status(403);
      console.log(error);
    }
  }
  if (req.method === "PATCH") {
    const { postId, userId } = req.body;

    try {
      const result = await prisma.rating.update({
        where: {
          reviewId: +postId,
          userId: userId,
        },
        data: {
          stars: rating,
        },
      });
      res.json(result);
    } catch (error) {
      res.status(403);
      console.log(error);
    }
  }
}
