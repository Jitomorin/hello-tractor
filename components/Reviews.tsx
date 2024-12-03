import { classNames } from "@/contexts/utils";
import { getDocument } from "@/utils/firebase/firestore";
import { StarIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";

const Reviews = ({ reviews }: any) => {
  const [users, setUsers]: any = useState();

  useEffect(() => {
    const fetchUser = async (uid: any) => {
      await getDocument("users", uid).then((res) => {
        return res;
      });
    };
    const tempUsers: any = [];
    reviews.map(async (rev: any) => {
      await getDocument("users", rev.userID).then((userRes) => {
        // Add the fetched user to a new array with the previous users
        tempUsers.push(userRes);
      });
      setUsers(tempUsers);
    });
  }, [users]);

  return (
    <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
      <h2 id="reviews-heading" className="text-lg font-medium text-gray-900">
        Reviews
      </h2>

      <div className="mt-6 space-y-10 divide-y divide-gray-200 border-t border-gray-200 pb-10">
        {reviews.length === 0 ? (
          <h1 className="text-xl text-center mt-5 text-gray-600 font-semibold">
            This seller has no reviews
          </h1>
        ) : (
          reviews.map((review: any, index: any) => {
            return (
              <div
                key={review.uid}
                className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
              >
                <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                  <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                    <h3 className="text-xl font-medium text-gray-900">
                      {review.title}
                    </h3>

                    <div
                      className="mt-3 space-y-6 text-base text-gray-500"
                      dangerouslySetInnerHTML={{
                        __html: review.content,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                  {/* <p className="font-medium text-gray-900">
                    {users && users![index].fullName}
                  </p> */}
                  {users && (
                    <div className="">
                      <dd className="mt-3 space-y-3 text-gray-500">
                        <div className="flex space-x-2 cursor-pointer w-auto py-2  transition-all ease-in-out rounded-lg">
                          <div className="w-14 h-14 rounded-full  overflow-hidden">
                            <img
                              className=" object-cover"
                              src={
                                users![index]?.profileUrl === ""
                                  ? "/images/profile.png"
                                  : users![index]?.profileUrl
                              }
                              alt="avatar"
                              onError={(e: any) => {
                                e.target.src = "/images/profile.png"; // Set alternative image if the first image fails to load
                              }}
                            />
                          </div>
                          <div className="flex justify-center flex-col">
                            <p className="font-semibold">
                              {users![index]?.fullName}
                            </p>
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    review.rating > rating
                                      ? "text-yellow-400"
                                      : "text-gray-200",
                                    "h-7 w-h-7 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </dd>
                    </div>
                  )}
                  <time
                    dateTime={review.timestamp}
                    className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                  >
                    {new Date(
                      review.timestamp.seconds * 1000
                    ).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Reviews;
