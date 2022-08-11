import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";

interface WriteAReviewProps {
  _id: string;
}

const WriteAReview = ({ _id }: WriteAReviewProps) => {
  const [starRating, setStarRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  let data;

  const handleSubmit = async (
    _id: string,
    name: string,
    comment: string,
    rating: number
  ) => {
    data = {
      _id: _id,
      name: name,
      comment: comment,
      rating: rating,
    };
    console.log(data);
    await fetch("/api/postReview", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => setSubmitted(true))
      .then(() => {
        setName("");
        setComment("");
        setStarRating(0);
      })
      .catch((err) => console.log("Review not posted: ", err));
  };

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      {submitted ? (
        <div className="flex flex-col text-center p-2 my-2 bg-indigo-700 rounded text-white mt-4  mx-auto">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your review.
          </h3>
          <p className="text-center">
            Once it has been approved, it will appear below!
          </p>
        </div>
      ) : (
        <form className="space-y-8 divide-y divide-gray-200 bg-color-primary-variant p-2 m-1 mt-7 rounded border-2 border-background-variant shadow-lg">
          <div className="space-y-8 divide-y divide-gray-200 ">
            <div>
              <div className="text-center lg:text-2xl">Your Review</div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <input type="hidden" name="_id" value={_id} />
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="given-name"
                      className="flex p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Review
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="content"
                      name="content"
                      rows={3}
                      className="shadow-sm p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Write a few sentences about the product.
                  </p>
                  <div className={"flex flex-row"}>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        onMouseOver={() => setStarRating(rating + 1)}
                        key={rating}
                        className={classNames(
                          starRating > rating
                            ? "text-yellow-400"
                            : "text-gray-300",
                          "flex-shrink-0 h-5 w-5 md:h-6 md:w-6 m-1   "
                        )}
                      />
                    ))}
                  </div>
                  <button
                    type={"button"}
                    onClick={() => handleSubmit(_id, name, comment, starRating)}
                    className="w-full mt-4 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    Leave your review.
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default WriteAReview;
