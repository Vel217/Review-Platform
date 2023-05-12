import prisma from "@/lib/prisma";

export default async function deletePost(req, res) {
  const { postId } = req.body;

  try {
    const result = await prisma.review.delete({
      where: {
        id: +postId,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(403);
  }
}
