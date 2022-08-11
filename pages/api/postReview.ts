import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";

export default async function postReview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, comment, rating } = JSON.parse(req.body);

  try {
    await sanityClient.create({
      _type: "comment",
      product: {
        _type: "reference",
        _ref: _id,
      },
      name,
      comment,
      rating,
    });
  } catch (err) {
    console.warn(err);
    return res.status(500).json({ message: `Couldn't post review`, err });
  }

  res.status(200).json({ message: "Comment submitted Successfully" });
}
