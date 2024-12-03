import { formatNumber } from "@/utils/formatNumber";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import StarRating from "./StarRating";
import Rating from "./Rating";
import { calculateAverageRating } from "@/utils/usefulFunctions";
import { classNames } from "@/contexts/utils";
import ApprovalPill from "./ApprovalPill";

const TractorGrid = ({ tractors, router }: any) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {tractors.map((tractor: any) => (
        <div
          key={tractor.id}
          onClick={() => {
            router.push(`/shop/${tractor.uid}`);
          }}
          className="cursor-pointer transition-all ease-in-out rounded-lg  flex flex-col"
        >
          <Swiper
            className="w-[30rem] z-0 md:w-full"
            style={{
              "--swiper": "z-index: 0",
              "--swiper-button-next": "hidden",
              "--swiper-button-prev": "hidden",
              "--swiper-pagination-color": "#1C4D9C",
              "--swiper-pagination-bullet-inactive-color": "#b1b1b1",
              "--swiper-pagination-bullet-inactive-opacity": "1",
              "--swiper-pagination-bullet-size": "6px",
              "--swiper-pagination-bullet-horizontal-gap": "3px",
              "--swiper-navigation-color": "#1C4D9C",
              "--swiper-navigation": "z-index: 1000",
              "--swiper-navigation": "&hover{display:block} ",
              "--swiper-scrollbar": "hidden",
            }}
            modules={[Pagination]}
            spaceBetween={200}
            slidesPerView={1}
            centeredSlides
            pagination={{
              clickable: true,
            }}
            navigation={false}
            loop={true}
          >
            {tractor.images.map((img: any, index: any) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[200px] flex flex-col items-center overflow-hidden">
                  <img
                    className="w-full rounded-lg h-full object-cover"
                    src={img}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="p-4 flex flex-col flex-grow">
            {/* Make, Model, and Rating */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">
                {tractor.make} {tractor.model}
              </h2>
              {/* Rating Component */}
              <Rating rating={calculateAverageRating(tractor.reviews)} />
            </div>
            <div className="flex items-center mb-2">
              <ApprovalPill value={tractor.availability} />
            </div>
            <p className="text-gray-600 mb-4 line-clamp-4 relative">
              {tractor.description}
              <span className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent"></span>
            </p>
            <div className="mt-auto">
              <p className="text-xl font-bold">
                Ksh {formatNumber(tractor.price.toLocaleString())}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TractorGrid;
