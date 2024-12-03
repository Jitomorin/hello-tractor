import AdminListingsTable from "@/components/AdminListingsTable";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Divider from "@/components/Divider";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import RentalsTable from "@/components/RentalsTable";
import ShowMore from "@/components/ShowMore";
import Snackbar from "@/components/Snackbar";
import Spinner from "@/components/Spinner";
import TractorGrid from "@/components/TractorGrid";
import { useAuthContext } from "@/contexts/AuthContext";
import { getDocument, getFilteredData } from "@/utils/firebase/firestore";
import { uploadCoverImage } from "@/utils/firebase/storage";
import { formatNumber } from "@/utils/formatNumber";
import { BadgeCheckIcon } from "lucide-react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Query {
  [key: string]: string;
}

function Profile(props: any) {
  const { user, loading }: any = useAuthContext();
  const { profile }: any = props;
  const [userListings, setUserListings] = useState<any>([]);
  const [newCoverImage, setNewCoverImage] = useState<any>(null);
  const router = useRouter();
  const [isListingsLoading, setIsListingsLoading] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const formObject = {
    fields: {
      Phone: profile.phoneNumber,
      Email: profile.email,
      Role: profile.role,
    },
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
    }
    const getListings = async () => {
      setIsListingsLoading(true);
      await getFilteredData("listings", "userID", "==", profile.uid).then(
        (res: any) => {
          setUserListings(res);
          setIsListingsLoading(false);
        }
      );
    };
    getListings();
  }, []);

  if (loading) {
    return <div className="m-auto w-full h-full text-4xl">Loading...</div>;
  }
  return (
    <main className="mx-10">
      <div className="relative z-0 flex flex-1 overflow-hidden">
        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
          {/* Breadcrumb */}
          <article>
            <div>
              {profile.coverImageURL === "" ? (
                <div className="relative overflow-hidden h-44 w-full object-cover lg:h-48 bg-gray-600">
                  {user.uid === profile.uid && (
                    <label
                      htmlFor="desktop-user-photo"
                      className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                    >
                      <span>Change Cover Image</span>
                      <span className="sr-only"> user photo</span>
                      <input
                        type="file"
                        id="desktop-user-photo"
                        name="user-photo"
                        accept="image/*"
                        className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                        onChange={async (e: any) => {
                          setNewCoverImage(e.target.files[0]);
                          console.log(e.target.files[0]);
                          await uploadCoverImage(
                            e.target.files[0],
                            user.uid
                          ).then((res) => {
                            setSnackbarMessage(res.message);
                            setSnackbarOpen(true);
                            router.reload();
                          });
                        }}
                      />
                    </label>
                  )}
                </div>
              ) : (
                <div className="relative overflow-hidden">
                  <img
                    className="h-44 w-full object-cover lg:h-48"
                    src={profile.coverImageURL}
                    alt=""
                  />
                  {user.uid === profile.uid && (
                    <label
                      htmlFor="desktop-user-photo"
                      className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100 transition-all ease-in-out"
                    >
                      <span>Change Cover Image</span>
                      <span className="sr-only"> user photo</span>
                      <input
                        type="file"
                        id="desktop-user-photo"
                        name="user-photo"
                        accept="image/*"
                        className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                        onChange={async (e: any) => {
                          setNewCoverImage(e.target.files[0]);
                          console.log(e.target.files[0]);
                          await uploadCoverImage(
                            e.target.files[0],
                            user.uid
                          ).then((res) => {
                            setSnackbarMessage(res.message);
                            setSnackbarOpen(true);
                            router.reload();
                          });
                        }}
                      />
                    </label>
                  )}
                </div>
              )}
              <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:flex-col sm:items-start sm:space-x-5">
                  <div className="flex">
                    <img
                      className="h-52 w-52 rounded-full ring-4 ring-white sm:h-60 sm:w-60 mx-auto z-30"
                      src={
                        profile?.profileUrl === ""
                          ? "/images/profile.png"
                          : profile?.profileUrl
                      }
                      alt=""
                    />
                  </div>
                  <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end  sm:pb-1">
                    <div className="mt-6 min-w-0 flex-1  2xl:block">
                      <h1 className="truncate flex align-middle items-center text-2xl font-bold text-gray-900">
                        {profile.fullName}
                        {profile.isVerified && (
                          <BadgeCheckIcon className="text-primary size-6 ml-1" />
                        )}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                  <h1 className="truncate text-2xl font-bold text-gray-900">
                    {profile.name}
                  </h1>
                </div>
              </div>
            </div>

            {/* Description list */}
            <div className="mx-auto mt-6 max-w-full px-4 sm:px-6 lg:px-8">
              <div className="sm:col-span-2 mb-10">
                <dt className="text-lg font-medium text-gray-500">Bio</dt>
                <dd
                  className="mt-1 max-w-prose space-y-5 text-lg text-gray-900"
                  dangerouslySetInnerHTML={{ __html: profile.bio }}
                />
              </div>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                {Object.keys(formObject.fields).map((field) => (
                  <div key={field} className="sm:col-span-1">
                    <dt className="text-lg font-medium text-gray-500">
                      {field}
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">
                      {formObject.fields[field]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mx-auto mt-8 max-w-full px-4 pb-12 sm:px-6 lg:px-8">
              <h2 className="text-2xl mb-4 font-medium text-black">Listings</h2>
              {isListingsLoading ? (
                <></>
              ) : (
                <>
                  {userListings.length === 0 ? (
                    <div className="h-full w-full flex justify-center items-center">
                      <h1 className="text-xl w-full text-left font-poppins font-semibold text-gray-500">
                        No Listings Found
                      </h1>
                    </div>
                  ) : (
                    <ShowMore maxHeight={200}>
                      <TractorGrid router={router} tractors={userListings} />
                    </ShowMore>
                  )}
                </>
              )}
            </div>
          </article>
        </main>
      </div>
    </main>
  );
}

export default Profile;

export const getServerSideProps: GetServerSideProps<any, Query> = async (
  ctx
) => {
  const { params = {} } = ctx;
  console.log("params", params);
  const profile = await getDocument("users", params.user);
  console.log("params", params.user);

  const userSlug = params.user as string;

  if (!profile) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      profile: profile,
      userSlug: userSlug,
    },
  };
};
