import prisma from "@/lib/prisma";

export default async function addComment(req, res) {
  const { postId, userId, textarea } = req.body;

  const result = await prisma.comment.create({
    data: {
      reviewId: +postId,
      userId: "clhc83zgp0000lc09djw31scg",
      content: textarea,
    },
  });

  res.json(result);
}
