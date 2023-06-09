import prisma from "@/lib/prisma";

export default async function addComment(req, res) {
  const { postId, userId, textarea } = req.body;

  try {
    const result = await prisma.comment.create({
      data: {
        reviewId: +postId,
        userId: userId,
        content: textarea,
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
  }
}
