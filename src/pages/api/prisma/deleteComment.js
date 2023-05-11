import prisma from "@/lib/prisma";

export default async function deleteComment(req, res) {
  const { commentId } = req.body;

  try {
    const result = await prisma.comment.delete({
      where: {
        id: +commentId,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(403);
  }
}
