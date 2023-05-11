import prisma from "@/lib/prisma";

export default async function addLike(req, res) {
  const { postId, userId } = req.body;

  try {
    const result = await prisma.like.delete({
      where: {
        reviewId: +postId,
        userId: userId,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(403);
    console.log(error);
  }
}
