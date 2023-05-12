import prisma from "@/lib/prisma";

export default async function addLike(req, res) {
  const { likeId } = req.body;

  try {
    const result = await prisma.like.delete({
      where: {
        id: +likeId,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(403);
    console.log(error);
  }
}
