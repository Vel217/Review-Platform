import prisma from "@/lib/prisma";

export default async function addComment(req, res) {
  const { postId, userId, textarea } = req.body;

  const result = await prisma.comment.findMany({
    where: {
      reviewId: +postId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  res.json(result);
}
