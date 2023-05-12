import prisma from "@/lib/prisma";

export default async function addNewReview(req, res) {
  const {
    film,
    nameOfReview,
    group,
    userId,
    textContent,
    filesUrlDB,
    rating,
    reviewTags,
    reviewTagsObj,
  } = req.body;
  try {
    const result = await prisma.review.create({
      data: {
        reviewName: nameOfReview,
        filmId: +film,
        category: group,
        authorId: userId,
        imageUrl: filesUrlDB,
        content: textContent,
        stars: +rating,
      },
    });
    const createTags = await prisma.tag.createMany({
      data: reviewTagsObj,
      skipDuplicates: true,
    });

    const resultTags = await prisma.tag.findMany({
      where: {
        title: {
          in: reviewTags,
        },
      },
    });

    const modifiedResult = resultTags.map((item) => ({
      tagId: item.id,
      reviewId: +result.id,
    }));

    const createTagging = await prisma.taggings.createMany({
      data: modifiedResult,
    });
    res.json(result);

    res.json(result);
  } catch (error) {
    res.status(403);
    console.log(error);
  }
}
