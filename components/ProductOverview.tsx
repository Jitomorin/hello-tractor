import { addDays } from "date-fns";
import { useContext, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  GlobeAmericasIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
// import { DateRangePicker } from "react-date-range";
import { formatNumber } from "@/utils/formatNumber";
import styled from "styled-components";
import {
  addData,
  addDataWithDocName,
  addProductToCart,
  checkIfChatExists,
  getDocument,
  removeProductFromCart,
} from "@/utils/firebase/firestore";
import { useRouter } from "next/router";
import { Navigation, Pagination } from "swiper/modules";
import ThumbSwiper from "./ThumbSwiper";
import Reviews from "./Reviews";
import { DateRangePicker } from "@nextui-org/react";
import { createDateFromObject } from "@/utils/formatDate";
import CustomDateRangePicker from "./CustomDateRangePicker";
import { GetServerSideProps } from "next";
import { BadgeCheckIcon } from "lucide-react";
import HeartButton from "./HeartButton";
import ApprovalPill from "./ApprovalPill";
import { CartContext } from "@/contexts/CartContext";

const policies = [
  {
    name: "Reach Out",
    icon: ShoppingCartIcon,
    description: "Contact the seller and negotiate a price",
  },
  {
    name: "Agree on details",
    icon: CurrencyDollarIcon,
    description: "Agree on mode of payment and delivery",
  },
  {
    name: "Complete Order",
    icon: BuildingOffice2Icon,
    description: "Through chat agree on order completion",
  },
];
const LeftSide = styled.div`
  .rdrDefinedRangesWrapper {
    display: none;
  }
`;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductOverview({
  listing,
  // cart,
  user,
  callSnackBar,
}: any) {
  const [host, setHost]: any = useState({ reviews: [] });
  const { cart, loading, error }: any = useContext(CartContext);
  const router = useRouter();
  const [wishlistLoading, setWishlistLoading] = useState(false);
  getDocument("users", listing.userID).then((res: any) => {
    setHost(res);
  });

  const onBuy = async (chatUID: any) => {
    const uid: any = uuidv4();
    addDataWithDocName("orders", uid, {
      listing,
      userID: user?.uid,
      uid,
      confirmed: false,
      createdAt: new Date(),
      confirmationCode: "",
      status: "pending",
      placed: false,
      chatUID,
    }).then((res: any) => {
      callSnackBar("Order made successfully, please wait.");
    });
  };

  const createChat = async () => {
    // if chat with this user exists then navigate to it if not then create it and then navigate to it
    checkIfChatExists(host?.uid, user.uid).then((result: any) => {
      // console.log("resuuulr", result);
      if (result.length !== 0) {
        onBuy(result[0].uid).then(() => {
          router.push(`/dashboard/chats/${result[0].uid}`);
        });
      } else {
        const uid = uuidv4();
        addDataWithDocName("chats", uid, {
          chat: [],
          createdAt: new Date(),
          updatedLast: new Date(),
          userID: user.uid,
          users: [user.uid, host?.uid],
          uid,
        }).then(() => {
          onBuy(result[0].uid).then(() => {
            router.push(`/dashboard/chats/${uid}`);
          });
        });
      }
    });
  };

  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-full px-4 sm:px-6 lg:max-w-full lg:px-8">
          <div className="flex flex-col w-full">
            <div className="">
              <div className="flex justify-between flex-col w-auto">
                <ThumbSwiper images={listing.images} />
                {/* mobile slider */}
                <div className="flex md:hidden">
                  <Swiper
                    className="w-[100%] z-0 md:w-full"
                    style={{
                      "--swiper": "z-index: 0",
                      "--swiper-pagination-color": "#1C4D9C",
                      "--swiper-pagination-bullet-inactive-color": "#b1b1b1",
                      "--swiper-pagination-bullet-inactive-opacity": "1",
                      // "--swiper-pagination-bullet": "&hover{cursor:pointer} ",
                      "--swiper-pagination-bullet-size": "5px",
                      "--swiper-pagination-bullet-horizontal-gap": "3px",
                      "--swiper-navigation-color": "#1C4D9C",
                      "--swiper-navigation": "hidden",
                      "--swiper-navigation": "z-index: 1000",
                      "--swiper-navigation": "&hover{display:block} ",
                    }}
                    modules={[Pagination]}
                    spaceBetween={200}
                    slidesPerView={1}
                    centeredSlides
                    pagination={{
                      clickable: true,
                    }}
                    navigation={false}
                    scrollbar={{ draggable: true }}
                    loop={true}
                  >
                    {listing.images.map((image: any, index: number) => (
                      <SwiperSlide key={index} className="rounded-lg">
                        <img
                          key={index}
                          src={image}
                          alt={"Listing Image"}
                          className={classNames(
                            "rounded-lg h-full object-fill"
                          )}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="mt-10 lg:mt-10">
                  <h2 className="text-5xl font-poppins font-bold text-gray-900">
                    {`${listing.make} ${listing.model}`}
                  </h2>
                  <ApprovalPill value={listing.availability} />
                  <h2 className="text-2xl mt-6 text-gray-900">Description</h2>

                  <div
                    className="prose prose-sm text-lg mt-4 text-gray-500"
                    dangerouslySetInnerHTML={{ __html: listing.description }}
                  />
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-bold text-gray-900">Details</h2>

                  <div className="prose prose-sm mt-4 text-gray-500">
                    <ul role="list">
                      <li>
                        <span className="font-bold">Make:</span>
                        {` ${listing.make}`}
                      </li>
                      <li>
                        <span className="font-bold">Model:</span>
                        {` ${listing.model}`}
                      </li>
                      <li>
                        <span className="font-bold">Year:</span>
                        {` ${listing.age}`}
                      </li>
                      <li>
                        <span className="font-bold">Hours Used:</span>
                        {` ${listing.hours}`}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <LeftSide className=" mt-8 col-span-5 lg:col-span-5">
              <div>
                <p className="text-2xl font-bold text-gray-900 mt-4">
                  {`Price: ${formatNumber(listing.price)}Ksh`}
                </p>
              </div>
              <div className="mt-10">
                <dt className="font-medium text-3xl text-gray-900">Seller</dt>
                <dd className="mt-3 space-y-3 text-gray-500">
                  <div
                    className="flex space-x-2 cursor-pointer w-auto p-2  transition-all ease-in-out rounded-lg"
                    onClick={() => {
                      router.push(`/profile/${host?.uid}`);
                    }}
                  >
                    <div className="w-14 h-14 rounded-full  overflow-hidden">
                      <img
                        className=" object-cover"
                        src={
                          host?.profileUrl === ""
                            ? "/images/profile.png"
                            : host?.profileUrl
                        }
                        alt="avatar"
                      />
                    </div>
                    <div className="flex justify-center flex-col">
                      <p className="font-semibold flex space-x-2">
                        {host?.fullName}
                        {host.isVerified && (
                          <BadgeCheckIcon className="text-primary size-6 ml-1" />
                        )}
                      </p>
                      <p>{host?.email}</p>
                    </div>
                  </div>

                  <div className="flex mt-4 space-x-4">
                    {user ? (
                      <button
                        onClick={createChat}
                        type="button"
                        className="bg-primary rounded-lg text-xl font-semibold hover:scale-[1.03] transition-all ease-in-out text-white p-4"
                      >
                        Contact Seller
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          router.push("/login");
                        }}
                        type="button"
                        className="bg-primary rounded-lg text-xl font-semibold hover:scale-[1.03] transition-all ease-in-out text-white p-4"
                      >
                        Log in to contact seller
                      </button>
                    )}
                    <HeartButton
                      loading={wishlistLoading}
                      user={user}
                      callSnackbar={callSnackBar}
                      setLoading={setWishlistLoading}
                      isAdded={cart?.products?.some(
                        (item: any) => item.uid === listing.uid
                      )}
                      onPress={async () => {
                        if (
                          cart?.products?.some(
                            (item: any) => item.uid === listing.uid
                          )
                        ) {
                          setWishlistLoading(true);
                          await removeProductFromCart(listing, user.uid).then(
                            (res: any) => {
                              callSnackBar(res.message);
                              setWishlistLoading(false);
                            }
                          );
                        } else {
                          setWishlistLoading(true);
                          await addProductToCart(listing, user?.uid).then(
                            (res: any) => {
                              callSnackBar(res.message);
                              setWishlistLoading(false);
                            }
                          );
                        }
                      }}
                    />
                  </div>
                </dd>
              </div>

              {/* Product details */}

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <div className="mt-5">
                  <Reviews reviews={host?.reviews} />
                </div>
              </section>
            </LeftSide>
            <div className="col-span-12 mt-10 justify-center items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<any> = async (ctx: any) => {
  const { draftMode = false, params = {} } = ctx;

  return {
    props: {
      draftMode,
      // token: draftMode ? readToken : "",
    },
  };
};
